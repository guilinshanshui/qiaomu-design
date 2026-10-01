import hashlib
import json
import re
import subprocess
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class PackageContractTests(unittest.TestCase):
    def read_active(self, relative_path):
        return (ROOT / relative_path).read_text(encoding="utf-8")

    def test_root_skill_is_the_only_discoverable_entrypoint(self):
        entries = [path.relative_to(ROOT) for path in ROOT.rglob("SKILL.md") if ".git" not in path.parts]
        self.assertEqual(entries, [Path("SKILL.md")])

    def test_root_skill_stays_within_production_context_budget(self):
        self.assertLessEqual((ROOT / "SKILL.md").stat().st_size, 14_000)

    def test_manifest_and_frontmatter_versions_match(self):
        manifest = json.loads((ROOT / "manifest.json").read_text(encoding="utf-8"))
        skill = (ROOT / "SKILL.md").read_text(encoding="utf-8")
        name = re.search(r"^name:\s*([^\n]+)$", skill, re.MULTILINE)
        version = re.search(r'^\s+version:\s*"([^"]+)"$', skill, re.MULTILINE)
        self.assertIsNotNone(name)
        self.assertIsNotNone(version)
        self.assertEqual(manifest["name"], name.group(1).strip())
        self.assertEqual(manifest["version"], version.group(1))

    def test_phase_two_uses_the_six_direction_af_protocol(self):
        active_paths = [
            "SKILL.md",
            "references/style-preview.md",
            "references/preflight.md",
            "references/assets-and-readability.md",
            "references/divergence-playbook.md",
            "references/creative-prompting.md",
            "references/craft-loop.md",
            "references/user-preferences.md",
            "README.md",
            "manifest.json",
            "agents/interface.yaml",
            "reports/skill-ir.json",
            "evals/trigger_cases.json",
            "reports/trigger-eval.json",
        ]
        active_text = {
            path: self.read_active(path)
            for path in active_paths
        }
        self.assertIn("A–F", active_text["SKILL.md"])
        self.assertIn("3×2", active_text["references/style-preview.md"])
        self.assertIn("3×2", active_text["references/preflight.md"])
        self.assertIn("1–6", active_text["references/style-preview.md"])
        self.assertIn("1–6", active_text["references/preflight.md"])
        for path, text in active_text.items():
            self.assertNotIn("2×2", text, path)

    def test_direction_decision_tree_and_reference_roles_are_explicit(self):
        skill = self.read_active("SKILL.md")
        preflight = self.read_active("references/preflight.md")
        self.assertIn("先按以下决策树判断", skill)
        self.assertIn("像素复刻", skill)
        self.assertIn("VibeUI 只作通用风格/结构参考", skill)
        self.assertIn("VibeUI 只作通用风格/结构参考，不得称为品牌 DNA", skill)
        self.assertIn("外援角色已区分", preflight)
        self.assertIn("品牌 DNA 供体/DNA 注入", preflight)

    def test_vibeui_templates_are_not_mislabeled_as_brand_dna_donors(self):
        vibeui_index = self.read_active("references/vibeui-design-index.md")
        generator = self.read_active("scripts/qiaomu-vibeui-sync.mjs")
        catalog = self.read_active("references/design-systems-catalog.md")
        for text in (vibeui_index, generator):
            self.assertIn("本索引的运行定位是通用风格与结构参考", text)
            self.assertIn("不把本索引条目称为品牌 DNA 供体", text)
            self.assertIn("用本地文件负责品牌 DNA", text)
            self.assertNotIn("从本索引选择 1–2 个供体", text)
            self.assertNotIn("只提取 3–5 个具体 DNA 值", text)
        self.assertIn("选出 1–2 个风格/结构参考", catalog)
        self.assertNotIn("选出 1–2 个供体", catalog)

    def test_system_fonts_are_not_categorically_banned(self):
        preflight = self.read_active("references/preflight.md")
        self.assertIn("中文正文/UI 可且通常应使用系统字体栈", preflight)
        self.assertIn("只有拉丁展示/品牌排版需要避开", preflight)
        readme = self.read_active("README.md")
        self.assertNotIn("禁 Inter", readme)

    def test_six_direction_rule_and_retirement_resolve_the_ledger_conflict(self):
        preferences = self.read_active("references/user-preferences.md")
        self.assertIn("## Always Apply 硬规则摘要", preferences)
        self.assertIn("## 领域规则（Domain Rules）", preferences)
        self.assertIn("## 历史与已废止档案（Historical / Retired Archive）", preferences)
        self.assertIn("当前用户要求与项目事实 > 本账本中最新生效规则 > 领域规则 > 通用建议", preferences)
        self.assertIn("### P-48 · 设计方向阶段固定交付 A–F 六方向试衣间", preferences)
        old_rule = preferences.split("### P-37", 1)[1].split("### P-38", 1)[0]
        self.assertIn("状态：已废止", old_rule)
        self.assertIn("P-48", old_rule)

    def test_reference_catalog_uses_logical_dedup_and_retains_physical_mirror(self):
        preferences = self.read_active("references/user-preferences.md")
        preflight = self.read_active("references/preflight.md")
        skill = self.read_active("SKILL.md")
        self.assertIn("### P-49 · 参考库采用逻辑去重、物理保留", preferences)
        self.assertIn("116", preferences)
        self.assertIn("54", preferences)
        self.assertIn("逻辑去重、物理保留", preflight)
        self.assertIn("116", preflight)
        self.assertIn("54", skill)

    def test_recommendation_scoring_has_seven_dimensions(self):
        style_preview = self.read_active("references/style-preview.md")
        for dimension in (
            "任务契合",
            "三秒理解",
            "品牌/系统一致",
            "辨识度",
            "无障碍",
            "实现风险",
            "参考契合",
        ):
            self.assertIn(dimension, style_preview)

    def test_generated_trigger_report_passes_every_case(self):
        report = json.loads((ROOT / "reports" / "trigger-eval.json").read_text(encoding="utf-8"))
        self.assertTrue(report["ok"])
        self.assertEqual(report["summary"]["passed"], report["summary"]["total"])

    def test_node_scripts_parse(self):
        for script in sorted((ROOT / "scripts").glob("*.mjs")):
            with self.subTest(script=script.name):
                result = subprocess.run(
                    ["node", "--check", str(script)],
                    cwd=ROOT,
                    capture_output=True,
                    text=True,
                    timeout=10,
                )
                self.assertEqual(result.returncode, 0, result.stderr)

    def test_evolution_ledger_verifies(self):
        result = subprocess.run(
            ["node", "scripts/qiaomu-design-evolution.mjs", "verify"],
            cwd=ROOT,
            capture_output=True,
            text=True,
            timeout=10,
        )
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("verify passed", result.stdout)

    def test_vibeui_snapshot_is_a_verified_offline_mirror(self):
        index_path = ROOT / "references" / "vibeui-design-index.json"
        markdown_path = ROOT / "references" / "vibeui-design-index.md"
        self.assertTrue(index_path.exists())
        self.assertTrue(markdown_path.exists())

        payload = json.loads(index_path.read_text(encoding="utf-8"))
        self.assertEqual(payload["formatVersion"], 2)
        self.assertEqual(payload["scope"], "ui-design-only")
        self.assertTrue(payload["offline"])
        self.assertEqual(payload["referenceRole"]["kind"], "style-and-structure-reference")
        self.assertEqual(payload["referenceRole"]["brandDnaAuthority"], "references/design-systems")
        self.assertFalse(payload["referenceRole"]["brandDnaDonorsAllowed"])
        self.assertEqual(payload["summary"]["totalDesigns"], 112)
        self.assertEqual(payload["summary"]["totalPreviews"], 166)
        self.assertEqual(payload["summary"]["totalCategories"], 9)
        self.assertEqual(payload["summary"]["localDesignSystems"], 54)
        self.assertEqual(payload["summary"]["extendedOnly"], 58)
        self.assertEqual(payload["summary"]["uniqueReferences"], 116)
        self.assertEqual(payload["summary"]["localBrandReferences"], 58)
        self.assertEqual(payload["summary"]["vibeuiUniqueReferences"], 58)
        self.assertEqual(payload["summary"]["overlapDesigns"], 54)
        self.assertEqual(payload["summary"]["overlapPreviews"], 108)
        self.assertEqual(payload["summary"]["mirroredDesigns"], 112)
        self.assertEqual(payload["summary"]["mirroredPreviews"], 166)
        self.assertEqual(payload["summary"]["mirroredFiles"], 473)
        self.assertEqual(
            payload["referenceCatalog"],
            {
                "policy": "logical-dedup-physical-retain",
                "uniqueReferences": 116,
                "localBrandReferences": 58,
                "vibeuiUniqueReferences": 58,
                "overlapDesigns": 54,
                "overlapPreviews": 108,
                "physicallyMirroredDesigns": 112,
                "physicallyMirroredPreviews": 166,
                "note": "The 54 overlapping VibeUI designs and their 108 previews remain offline, but are excluded from the unique-reference count.",
            },
        )
        self.assertEqual(
            sum(payload["summary"]["categoryCounts"].values()),
            payload["summary"]["totalDesigns"],
        )
        self.assertEqual(len(payload["designs"]), payload["summary"]["totalDesigns"])

        mirror_root = ROOT / payload["mirror"]["root"]
        self.assertTrue(mirror_root.is_dir())
        mirror_readme_path = ROOT / payload["mirror"]["readme"]
        self.assertTrue(mirror_readme_path.is_file())
        mirror_readme = mirror_readme_path.read_text(encoding="utf-8")
        self.assertIn("## 第三方许可", mirror_readme)
        self.assertIn("VoltAgent/awesome-design-md", mirror_readme)
        self.assertIn("nextlevelbuilder/ui-ux-pro-max-skill", mirror_readme)
        self.assertIn("Copyright (c) 2026 VoltAgent", mirror_readme)
        self.assertIn("Copyright (c) 2024 Next Level Builder", mirror_readme)
        self.assertIn("逻辑去重、物理保留", mirror_readme)
        self.assertIn("正式唯一参考：116", mirror_readme)
        self.assertIn("VibeUI 重叠预览补充：54 个设计 / 108 个预览", mirror_readme)
        manifest_paths = set()
        for file in payload["mirror"]["manifest"]:
            self.assertTrue(file["path"].startswith("references/vibeui-mirror/"))
            self.assertNotIn(file["path"], manifest_paths)
            manifest_paths.add(file["path"])
            absolute = ROOT / file["path"]
            self.assertTrue(absolute.is_file(), file["path"])
            data = absolute.read_bytes()
            self.assertEqual(len(data), file["bytes"], file["path"])
            self.assertEqual(hashlib.sha256(data).hexdigest(), file["sha256"], file["path"])

        actual_mirror_paths = {
            path.relative_to(ROOT).as_posix()
            for path in mirror_root.rglob("*")
            if path.is_file()
        }
        self.assertEqual(actual_mirror_paths, manifest_paths)

        for design in payload["designs"]:
            self.assertEqual(design["slug"], design["slug"].strip())
            self.assertIn(
                design["referenceClass"],
                ("local-brand-overlap-preview", "vibeui-unique-style"),
            )
            self.assertEqual(
                design["countsAsUniqueReference"],
                design["referenceClass"] == "vibeui-unique-style",
            )
            self.assertTrue(design["sourceFiles"]["design"].startswith("https://vibeui.top/"))
            self.assertTrue(design["sourceFiles"]["preview"].startswith("https://vibeui.top/"))
            for key in ("design", "preview", "previewDark"):
                local_path = design["files"].get(key, "")
                if key == "previewDark" and not local_path:
                    continue
                self.assertFalse(local_path.startswith("http"), local_path)
                self.assertTrue((ROOT / local_path).is_file(), local_path)
            for key in ("design", "preview"):
                url = design["sourceFiles"].get(key, "")
                self.assertTrue(url.startswith("https://vibeui.top/"), url)
                self.assertNotIn("/site-assets/", url)
            if design["localDesignPath"]:
                self.assertTrue((ROOT / design["localDesignPath"]).exists(), design["localDesignPath"])

        markdown = markdown_path.read_text(encoding="utf-8")
        self.assertIn("# VibeUI 离线设计图谱", markdown)
        self.assertIn("VibeUI 关站后不影响", markdown)
        self.assertIn("VibeUI 独有通用风格/结构参考（58）", markdown)
        self.assertIn("VibeUI 重叠预览补充（54）", markdown)

        forbidden_runtime_hosts = (
            "https://cdn.tailwindcss.com",
            "https://fonts.googleapis.com",
            "https://fonts.gstatic.com",
        )
        for design in payload["designs"]:
            preview_paths = [design["files"]["preview"]]
            if design["files"]["previewDark"]:
                preview_paths.append(design["files"]["previewDark"])
            for preview_path in preview_paths:
                preview = (ROOT / preview_path).read_text(encoding="utf-8")
                for host in forbidden_runtime_hosts:
                    self.assertNotIn(host, preview, preview_path)


if __name__ == "__main__":
    unittest.main()
