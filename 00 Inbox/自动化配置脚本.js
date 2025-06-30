// 自动化学习数据收集和更新脚本
// 使用方法: 在Templater中调用此脚本

<%*
  // ====================================
  // 🤖 自动化学习追踪系统
  // ====================================

  class AutoLearningTracker {
    constructor() {
      this.app = app;
      this.tp = tp;
      this.currentFile = this.tp.file.find_tfile(this.tp.file.title);
    }

    // 获取当前文件的学习数据
    async getCurrentFileData() {
      if (!this.currentFile) return null;

      const content = await this.app.vault.read(this.currentFile);
      const frontmatter = this.app.metadataCache.getFileCache(this.currentFile)?.frontmatter || {};

      return {
        title: this.currentFile.basename,
        path: this.currentFile.path,
        size: content.length,
        wordCount: content.split(/\s+/).length,
        frontmatter: frontmatter
      };
    }

    // 检测学习模式
    detectLearningPattern(data) {
      const editTime = data.frontmatter.edit_duration || 0;
      const wordCount = data.wordCount;
      const hasImages = data.content?.includes('![') || false;

      if (editTime > 1800 && wordCount > 500) {
        return "深度学习";
      } else if (editTime > 600 && hasImages) {
        return "资料整理";
      } else if (editTime > 300) {
        return "知识记录";
      } else {
        return "快速浏览";
      }
    }

    // 计算学习进度
    calculateProgress(subject) {
      // 获取该科目的所有笔记
      const notes = this.app.vault.getMarkdownFiles()
        .filter(file => file.path.includes(subject));

      if (notes.length === 0) return 0;

      let totalProgress = 0;
      let validNotes = 0;

      notes.forEach(note => {
        const cache = this.app.metadataCache.getFileCache(note);
        const progress = cache?.frontmatter?.progress || 0;
        if (progress > 0) {
          totalProgress += progress;
          validNotes++;
        }
      });

      return validNotes > 0 ? Math.round(totalProgress / validNotes) : 0;
    }

    // 自动更新学习统计
    async updateLearningStats() {
      const data = await this.getCurrentFileData();
      if (!data) return;

      // 检测科目
      const subject = this.detectSubject(data.path);

      // 计算新的统计数据
      const stats = {
        last_studied: new Date().toISOString().split('T')[0],
        study_pattern: this.detectLearningPattern(data),
        word_count: data.wordCount,
        file_size: data.size,
        subject: subject,
        auto_updated: true
      };

      // 更新进度（如果尚未设置）
      if (!data.frontmatter.progress && subject) {
        stats.progress = this.calculateProgress(subject);
      }

      return stats;
    }

    // 检测科目名称
    detectSubject(filePath) {
      const subjectMap = {
        'L4财务管理学': '财务管理学',
        'L5 投资学': '投资学',
        'L7统计学': '统计学',
        'L_经济法': '经济法',
        'L2_制度经济学': '制度经济学',
        'L6财政学': '财政学',
        'L3毛概': '毛概'
      };

      for (const [key, value] of Object.entries(subjectMap)) {
        if (filePath.includes(key)) {
          return value;
        }
      }
      return null;
    }

    // 生成学习洞察
    generateInsights() {
      const insights = [];

      // 获取今日学习数据
      const todayFiles = this.getTodayStudiedFiles();
      if (todayFiles.length > 0) {
        insights.push(`📚 今日已学习 ${todayFiles.length} 个文件`);
      }

      // 获取学习连击
      const streak = this.getStudyStreak();
      if (streak > 1) {
        insights.push(`🔥 已连续学习 ${streak} 天`);
      }

      // 获取最活跃科目
      const mostActive = this.getMostActiveSubject();
      if (mostActive) {
        insights.push(`⭐ 最活跃科目: ${mostActive}`);
      }

      return insights;
    }

    // 获取今日学习的文件
    getTodayStudiedFiles() {
      const today = new Date().toISOString().split('T')[0];
      return this.app.vault.getMarkdownFiles()
        .filter(file => {
          const cache = this.app.metadataCache.getFileCache(file);
          return cache?.frontmatter?.last_studied === today;
        });
    }

    // 计算学习连击天数
    getStudyStreak() {
      // 简化实现，可以根据需要增强
      const files = this.app.vault.getMarkdownFiles();
      const studyDates = new Set();

      files.forEach(file => {
        const cache = this.app.metadataCache.getFileCache(file);
        const lastStudied = cache?.frontmatter?.last_studied;
        if (lastStudied) {
          studyDates.add(lastStudied);
        }
      });

      // 计算连续天数（简化版）
      const sortedDates = Array.from(studyDates).sort().reverse();
      let streak = 0;
      const today = new Date().toISOString().split('T')[0];

      for (let i = 0; i < sortedDates.length; i++) {
        const expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() - i);
        const expectedDateStr = expectedDate.toISOString().split('T')[0];

        if (sortedDates[i] === expectedDateStr) {
          streak++;
        } else {
          break;
        }
      }

      return streak;
    }

    // 获取最活跃的科目
    getMostActiveSubject() {
      const subjectStats = {};
      const files = this.app.vault.getMarkdownFiles();

      files.forEach(file => {
        const cache = this.app.metadataCache.getFileCache(file);
        const subject = cache?.frontmatter?.subject;
        const lastStudied = cache?.frontmatter?.last_studied;

        if (subject && lastStudied) {
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          const studyDate = new Date(lastStudied);

          if (studyDate >= weekAgo) {
            subjectStats[subject] = (subjectStats[subject] || 0) + 1;
          }
        }
      });

      let mostActive = null;
      let maxCount = 0;

      for (const [subject, count] of Object.entries(subjectStats)) {
        if (count > maxCount) {
          maxCount = count;
          mostActive = subject;
        }
      }

      return mostActive;
    }

    // 主执行函数
    async execute() {
      try {
        // 更新当前文件的学习统计
        const stats = await this.updateLearningStats();

        // 生成洞察
        const insights = this.generateInsights();

        // 返回结果用于模板插入
        return {
          stats: stats,
          insights: insights,
          timestamp: new Date().toLocaleString('zh-CN')
        };

      } catch (error) {
        console.error('自动化追踪错误:', error);
        return {
          error: error.message,
          timestamp: new Date().toLocaleString('zh-CN')
        };
      }
    }
  }

// 执行自动化追踪
const tracker = new AutoLearningTracker();
const result = await tracker.execute();

// 输出结果到模板
if (result.error) {
  tR += `⚠️ 自动化追踪出错: ${result.error}\n`;
} else {
  // 输出统计信息
  if (result.stats) {
    tR += `## 🤖 自动学习统计\n\n`;
    tR += `- **最后学习**: ${result.stats.last_studied}\n`;
    tR += `- **学习模式**: ${result.stats.study_pattern}\n`;
    tR += `- **字数统计**: ${result.stats.word_count}\n`;

    if (result.stats.subject) {
      tR += `- **科目**: ${result.stats.subject}\n`;
    }

    if (result.stats.progress) {
      tR += `- **自动进度**: ${result.stats.progress}%\n`;
    }

    tR += `\n`;
  }

  // 输出洞察信息
  if (result.insights && result.insights.length > 0) {
    tR += `## 💡 学习洞察\n\n`;
    result.insights.forEach(insight => {
      tR += `- ${insight}\n`;
    });
    tR += `\n`;
  }

  tR += `*自动更新时间: ${result.timestamp}*\n`;
}
%> 