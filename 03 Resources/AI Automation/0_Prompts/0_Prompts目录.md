# AI 提示词库 (Prompts)
这个文件用于索引和管理所有AI提示词。通过dataview插件，我们可以方便地查看和管理所有提示词文件。
## 提示词索引
```dataview
TABLE 
  file.ctime as "创建时间",
  file.mtime as "修改时间",
  tags as "标签"
FROM "03 Resources/AI Automation/0_Prompts"
WHERE file.name != "0_Prompts目录"
SORT file.mtime DESC
```
## 按标签分类
```dataview
TABLE 
  file.link as "提示词",
  file.mtime as "修改时间"
FROM "03 Resources/AI Automation/0_Prompts"
WHERE file.name != "Prompts"
GROUP BY tags
SORT file.mtime DESC
```
## 使用指南
1. 所有提示词文件应当使用适当的标签进行分类，如 #prompt/writing, #prompt/coding 等
2. 每个提示词文件应包含以下内容：
   - 提示词的用途和说明
   - 完整的提示词文本
   - 使用示例
   - 适用场景
3. 定期整理和更新提示词，确保其有效性
