/**
 * 自动化学习追踪系统 - 财管框架
 * 用于追踪和记录学习进度，生成学习报告
 * @author: 学习管理系统
 * @date: 2025-07-01
 */

class LearningTracker {
  constructor() {
    this.learningData = {
      dailyGoals: [],
      completedTasks: [],
      studyTime: 0,
      subjects: new Map(),
      progress: new Map()
    };
    this.startTime = null;
    this.isTracking = false;
  }

  /**
   * 开始学习追踪
   * @param {string} subject - 学习科目
   * @param {string} goal - 学习目标
   */
  startTracking(subject, goal) {
    this.startTime = new Date();
    this.isTracking = true;

    console.log(`📚 开始追踪学习: ${subject}`);
    console.log(`🎯 学习目标: ${goal}`);
    console.log(`⏰ 开始时间: ${this.startTime.toLocaleString()}`);

    // 记录学习目标
    this.learningData.dailyGoals.push({
      subject,
      goal,
      startTime: this.startTime,
      status: 'in_progress'
    });
  }

  /**
   * 结束学习追踪
   * @param {string} notes - 学习笔记
   * @param {number} efficiency - 学习效率 (1-10)
   */
  stopTracking(notes = '', efficiency = 8) {
    if (!this.isTracking) {
      console.log('❌ 当前没有正在进行的学习追踪');
      return;
    }

    const endTime = new Date();
    const duration = (endTime - this.startTime) / (1000 * 60); // 分钟

    this.learningData.studyTime += duration;
    this.isTracking = false;

    const currentGoal = this.learningData.dailyGoals[this.learningData.dailyGoals.length - 1];
    if (currentGoal) {
      currentGoal.endTime = endTime;
      currentGoal.duration = duration;
      currentGoal.notes = notes;
      currentGoal.efficiency = efficiency;
      currentGoal.status = 'completed';
    }

    console.log(`✅ 学习完成!`);
    console.log(`⏱️ 学习时长: ${Math.round(duration)} 分钟`);
    console.log(`📊 学习效率: ${efficiency}/10`);
    console.log(`📝 学习笔记: ${notes}`);
  }

  /**
   * 生成学习报告
   * @param {string} type - 报告类型 (daily/weekly/monthly)
   */
  generateReport(type = 'daily') {
    const report = {
      type,
      date: new Date().toISOString().split('T')[0],
      totalStudyTime: Math.round(this.learningData.studyTime),
      completedGoals: this.learningData.dailyGoals.filter(g => g.status === 'completed').length,
      totalGoals: this.learningData.dailyGoals.length,
      efficiency: this.calculateAverageEfficiency()
    };

    console.log('\n📊 学习报告');
    console.log('='.repeat(40));
    console.log(`📅 日期: ${report.date}`);
    console.log(`⏰ 总学习时间: ${report.totalStudyTime} 分钟`);
    console.log(`🎯 完成目标: ${report.completedGoals}/${report.totalGoals}`);
    console.log(`📊 平均效率: ${report.efficiency}/10`);

    return report;
  }

  /**
   * 计算平均学习效率
   */
  calculateAverageEfficiency() {
    const completedGoals = this.learningData.dailyGoals.filter(g => g.efficiency);
    if (completedGoals.length === 0) return 0;

    const totalEfficiency = completedGoals.reduce((sum, goal) => sum + goal.efficiency, 0);
    return Math.round(totalEfficiency / completedGoals.length * 10) / 10;
  }
}

// 财管框架专用功能扩展
class FinanceManagementTracker extends LearningTracker {
  constructor() {
    super();
    this.financeTopics = [
      '财务分析',
      '投资管理',
      '风险控制',
      '成本管理',
      '预算规划',
      '资金筹集',
      '财务报表',
      '税务筹划'
    ];
  }

  /**
   * 添加财管专业学习目标
   * @param {string} topic - 财管主题
   * @param {string} specificGoal - 具体目标
   */
  addFinanceGoal(topic, specificGoal) {
    if (!this.financeTopics.includes(topic)) {
      console.log(`⚠️ 建议的财管主题: ${this.financeTopics.join(', ')}`);
    }

    this.startTracking(`财务管理-${topic}`, specificGoal);
  }

  /**
   * 生成财管专业报告
   */
  generateFinanceReport() {
    const baseReport = this.generateReport();
    const financeGoals = this.learningData.dailyGoals.filter(g =>
      g.subject && g.subject.includes('财务管理')
    );

    console.log('\n💼 财管专业学习报告');
    console.log('='.repeat(40));
    console.log(`📊 财管相关学习: ${financeGoals.length} 个目标`);

    return { ...baseReport, financeGoals: financeGoals.length };
  }
}

// 使用示例
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LearningTracker, FinanceManagementTracker };
} else {
  console.log('🚀 自动化学习追踪系统已加载 - 财管框架');
  console.log('💡 使用示例:');
  console.log('const tracker = new FinanceManagementTracker();');
  console.log('tracker.addFinanceGoal("财务分析", "学习杜邦分析法");');
  console.log('tracker.stopTracking("掌握了财务比率分析", 9);');
} 