/**
 * 综智助手 · 演示模式模拟层
 *
 * 作用：把页面发出的所有 /api/* 请求拦截下来，返回预置的示例数据。
 * 这样界面可以完整走完交互流程（点按钮有反应、表格有内容、能"导出"），
 * 但所有数据都是固定的示例，不连接任何真实后端。
 *
 * 使用方式：在 <head> 最前面引入本文件，并在 body 上加 data-demo="1"。
 *
 * 注意：这里不含任何真实业务数据，全部为演示编造的示例。
 */
(function () {
  "use strict";

  const DEMO_BANNER_TEXT = "演示版 · 界面示意，数据为示例，不连接真实服务";
  window.__DEMO_MODE__ = true;

  // ---------------------------------------------------------------
  // 示例数据
  // ---------------------------------------------------------------
  const DEMO = {
    meetings: [
      {
        id: "demo-meeting-1", meeting_name: "示例项目推进会",
        meeting_type: "domestic_receipt", start_at: "2026-10-09T09:00",
        location: "北楼301会议室", revision: 3, status: "draft",
        updated_at: "2026-10-08T16:20:00",
      },
      {
        id: "demo-meeting-2", meeting_name: "涉外项目对接会（示例）",
        meeting_type: "foreign_receipt", start_at: "2026-09-23T14:00",
        location: "北楼2208会议室", revision: 2, status: "confirmed",
        updated_at: "2026-09-22T10:05:00",
      },
      {
        id: "demo-meeting-3", meeting_name: "调研座谈会（示例）",
        meeting_type: "research_symposium", start_at: "2026-10-19T09:30",
        location: "北楼2203会议室", revision: 1, status: "draft",
        updated_at: "2026-10-18T15:40:00",
      },
    ],

    attendees: [
      { name: "张示例", organization: "甲方示例公司", department: "公司领导", title: "副总经理、总工程师", category: "来宾", sort_order: 1 },
      { name: "李示例", organization: "甲方示例公司", department: "公司领导", title: "副总经理", category: "来宾", sort_order: 2 },
      { name: "王示例", organization: "甲方示例公司", department: "发展规划部", title: "发展规划部经理", category: "来宾", sort_order: 3 },
      { name: "赵示例", organization: "甲方示例公司", department: "发展规划部", title: "发展规划部副经理", category: "来宾", sort_order: 4 },
      { name: "陈示例", organization: "乙方示例公司", department: "公司领导", title: "副总经理", category: "主方", sort_order: 5 },
      { name: "刘示例", organization: "乙方示例公司", department: "项目执行部", title: "副总工程师", category: "主方", sort_order: 6 },
      { name: "杨示例", organization: "乙方示例公司", department: "市场部", title: "市场部经理", category: "主方", sort_order: 7 },
      { name: "黄示例", organization: "乙方示例公司", department: "项目执行部", title: "项目副经理", category: "主方", sort_order: 8 },
    ],

    templates: [
      { id: "attendee_list_domestic_a", name: "国内参会名单（示例式：议程+名单）", category: "domestic" },
      { id: "attendee_list_domestic_b", name: "国内参会名单（延长式：名单+议程）", category: "domestic" },
      { id: "attendee_list_domestic_c", name: "国内参会名单（扬子式：仅名单+落款）", category: "domestic" },
      { id: "attendee_list_domestic_d", name: "国内参会名单（芳烃式：书名号标题）", category: "domestic" },
      { id: "attendee_list_symposium", name: "调研座谈会议程（多单位分组）", category: "domestic" },
      { id: "agenda_foreign_silleno", name: "涉外议程（SILLENO 中英文）", category: "foreign" },
      { id: "agenda_foreign_aramco", name: "涉外议程（沙特阿美 中英文）", category: "foreign" },
      { id: "handbook_symposium", name: "调研座谈会会议手册（公文格式）", category: "domestic" },
      { id: "desk_card_lt_zh", name: "L/T 型桌签（中文）", category: "card" },
      { id: "desk_card_l_en", name: "L 型桌签（英文）", category: "card" },
      { id: "meal_tag_landscape", name: "横版小饭签", category: "card" },
      { id: "welcome_screen_extend", name: "会议欢迎屏（延长式：单行）", category: "screen" },
      { id: "welcome_screen_yangzi", name: "会议欢迎屏（扬子式：三行含姓名）", category: "screen" },
    ],

    candidates: [
      { id: "c1", title: "国家能源局：加快推动新型储能规模化应用", source_name: "国家能源局",
        url: "https://www.nea.gov.cn/", published_at: "2026-11-15", verified: true, selected: true,
        summary: "国家能源局印发实施方案，提出到 2027 年新型储能装机规模达到 1.8 亿千瓦以上。" },
      { id: "c2", title: "中国石化：全力推动炼化产业高端化智能化绿色化发展", source_name: "中国石化新闻网",
        url: "https://www.sinopecnews.com.cn/", published_at: "2026-11-14", verified: true, selected: true,
        summary: "集团公司召开专题会议，部署炼化板块转型升级重点任务。" },
      { id: "c3", title: "今年以来我国石化行业运行总体平稳", source_name: "中国石油和化学工业联合会",
        url: "https://www.cpcia.org.cn/", published_at: "2026-11-13", verified: false, selected: false,
        summary: "1—10 月全行业增加值同比增长，主要产品产量保持稳定。" },
      { id: "c4", title: "国际油价小幅波动，市场关注供应端变化", source_name: "行业资讯",
        url: "https://www.example.com/oil", published_at: "2026-11-12", verified: true, selected: true,
        summary: "布伦特原油期货价格在区间内震荡，市场关注主要产油国产量政策。" },
    ],

    dailyBrief: {
      headline: "11月16日《每日要情》",
      brief_date: "2026-11-16",
      paragraphs: [
        "【政策动态】国家能源局印发新型储能实施方案，提出到 2027 年新型储能装机规模达到 1.8 亿千瓦以上，重点推动长时储能技术规模化应用。",
        "【集团要闻】中国石化召开专题会议，部署炼化板块转型升级重点任务，强调推动产业高端化、智能化、绿色化发展。",
        "【行业运行】1—10 月石化行业增加值同比增长，主要产品产量保持稳定，行业整体运行平稳。",
        "【市场观察】国际油价在区间内震荡，市场持续关注主要产油国产量政策变化。",
      ],
      sources: ["国家能源局", "中国石化新闻网", "中国石化联合会", "行业资讯"],
    },

    supervisionOptions: {
      categories: ["年度重点工作", "会议督办", "公文督办", "调研督办", "专项督办",
                   "互联网+督查", "其他督办", "部门重点工作", "贯彻落实习近平总书记重要指示批示"],
      leaders: ["孙示例", "钱示例", "褚示例", "卫示例", "周示例", "吴示例", "陈示例", "郑示例", "冯示例"],
      units: [
        { full: "公司办公室", short: "综合管理部" },
        { full: "党委工作部", short: "党委工作部" },
        { full: "企业改革管理部", short: "企改和法律部" },
        { full: "项目执行部", short: "项目执行部" },
        { full: "设计部", short: "设计部" },
        { full: "数字工程部", short: "数字工程部" },
        { full: "工艺室", short: "工艺室" },
        { full: "配管室", short: "配管室" },
        { full: "电气室", short: "电气室" },
        { full: "土建室", short: "土建室" },
      ],
      stage_count: 12,
      limits: { "督办事项": 100, "事项内容": 1000, "工作计划及目标": 500, "阶段目标": 500 },
    },

    dashboard: {
      meetings: 3, information_tasks: 2, official_documents: 1,
      knowledge_entries: 12, pending_items: 2,
    },

    aiStatus: { configured: true, model: "DeepSeek-V4.1-Flash（演示）", reachable: true },
  };

  // ---------------------------------------------------------------
  // 路由：按 path 返回示例数据
  // ---------------------------------------------------------------
  function pick(method, path, body) {
    // 登录
    if (path === "/api/auth/status") return { authenticated: true, username: "演示用户" };
    if (path === "/api/auth/login") return { authenticated: true, username: "演示用户" };
    if (path === "/api/auth/setup") return { authenticated: true, username: "演示用户" };

    // 总览
    if (path === "/api/dashboard") return DEMO.dashboard;
    if (path === "/api/ai/status") return DEMO.aiStatus;
    if (path === "/api/ai/audit") return { items: [], total: 0 };

    // 会务
    if (path === "/api/meetings") return { meetings: DEMO.meetings };
    if (path === "/api/meeting-templates") return { templates: DEMO.templates };
    if (path === "/api/meeting-templates/recommend")
      return { template_ids: ["attendee_list_domestic_a", "desk_card_lt_zh", "meal_tag_landscape", "welcome_screen_extend"],
               reason: "根据会议类型「国内接待」，推荐 4 类材料（演示结果）" };
    if (path === "/api/meeting-templates/check")
      return { ok: true, missing: [], findings: [], message: "材料齐全（演示）" };
    if (path === "/api/meeting-intake/parse") return demoIntake(body);
    if (path === "/api/meeting-bundle/generate") return demoBundle();
    if (path.startsWith("/api/meeting/")) {
      return { id: "demo-meeting-1", meeting: { meeting_name: DEMO.meetings[0].meeting_name,
               meeting_type: "domestic_receipt", start_at: "2026-10-09T09:00",
               location: "北楼301会议室", revision: 3 },
               attendees: DEMO.attendees, requirements: {}, findings: [] };
    }

    // 每日要情
    if (path === "/api/information/tasks") return { tasks: [] };
    if (path === "/api/information/candidates") return { candidates: DEMO.candidates };
    if (path === "/api/information/source-registry") return { sources: [] };
    if (path === "/api/information/automation") return { enabled: false, runs: [] };
    if (path === "/api/information/automation/history") return { runs: [] };
    if (path.includes("daily-brief")) return DEMO.dailyBrief;

    // 公文
    if (path === "/api/official-documents") return { documents: [] };

    // 知识库
    if (path === "/api/knowledge") return { entries: [] };

    // 督办
    if (path === "/api/supervision/options") return DEMO.supervisionOptions;
    if (path === "/api/supervision/validate") return demoSupervisionValidate(body);

    return null;
  }

  function demoIntake(body) {
    const text = String((body && body.text) || "");
    const findings = [];
    const meeting = {};
    // 从文本里抓几个明显的要素，让演示看起来"有反应"
    const dateMatch = text.match(/(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日/);
    const timeMatch = text.match(/(\d{1,2})\s*[点:：]\s*(\d{0,2})/);
    if (dateMatch) {
      const hh = timeMatch ? String(timeMatch[1]).padStart(2, "0") : "09";
      const mm = timeMatch && timeMatch[2] ? String(timeMatch[2]).padStart(2, "0") : "00";
      meeting.start_at = `${dateMatch[1]}-${String(dateMatch[2]).padStart(2, "0")}-${String(dateMatch[3]).padStart(2, "0")}T${hh}:${mm}`;
    }
    // 抓会议地点：支持「北楼301会议室」「2208会议室」「B座2208」等写法
    const roomMatch = text.match(/([A-Za-z\u4e00-\u9fa5]{0,6}(?:楼|座|层)?\s*\d{3,4}\s*(?:会议室|室))/);
    if (roomMatch) {
      meeting.location = roomMatch[1]
        .replace(/^[在到于赴至往]/, "")   // 去掉"在""到"等介词
        .replace(/\s+/g, "");
    }

    if (!meeting.start_at) findings.push("已识别日期缺失，请补充开始时间（演示）");
    if (!meeting.location) findings.push("未识别到会议地点，请补充（演示）");

    // 与真实接口保持一致：前端读取 fallback / person_candidates / attendees
    const filled = Object.keys(meeting);
    return {
      meeting_name: "示例项目推进会",
      meeting: Object.assign({
        theme: "示例项目推进",
        agenda: "1. 介绍项目总体进展\n2. 讨论关键技术方案\n3. 明确下一步工作安排",
        host: "乙方示例公司",
        visitor: "甲方示例公司",
      }, meeting),
      meeting_type: "domestic_receipt",
      attendees: DEMO.attendees.slice(0, 5),
      person_candidates: DEMO.attendees.map((a) => ({
        name: a.name, organization: a.organization,
        department: a.department, title: a.title, category: a.category,
      })),
      recognition: {
        confidence: { meeting_name: "high", start_at: meeting.start_at ? "high" : "low",
                      location: meeting.location ? "high" : "low" },
        requirements: { meal: true, accommodation: false, transport: true, materials: true },
        meeting_type: "domestic_receipt",
      },
      findings: findings.length ? findings : [],
      fallback: {
        used: filled.length > 0,
        filled_fields: filled,
        reason: "演示模式：由前端模拟生成，实际部署后由识别引擎/集团模型完成",
      },
    };
  }

  function demoBundle() {
    return {
      files: [
        { name: "国内参会名单（示例式：议程+名单）.docx", size: 24576 },
        { name: "L型桌签-张示例.docx", size: 12288 },
        { name: "L型桌签-李示例.docx", size: 12288 },
        { name: "横版小饭签.docx", size: 15360 },
        { name: "会议欢迎屏.docx", size: 18432 },
      ],
      message: "演示模式：已生成 5 份材料（示例），实际部署后可下载真实文件",
      demo: true,
    };
  }

  function demoSupervisionValidate(body) {
    const items = (body && body.items) || [];
    const errors = [];
    const warnings = [];
    items.forEach((it, i) => {
      const n = i + 1;
      const matter = String(it.matter || "");
      if (!it.category) errors.push(`第 ${n} 条：督办分类必填`);
      if (!matter) errors.push(`第 ${n} 条：督办事项必填`);
      else if (matter.length > 100) errors.push(`第 ${n} 条：督办事项 ${matter.length} 字，超过 100 字上限`);
      if (!it.main_unit) errors.push(`第 ${n} 条：主办单位必填（只能一个）`);
      if (it.need_supplement === "需要" && !it.supplement_deadline)
        errors.push(`第 ${n} 条：选择「需要」补充时，补充截止日期不能为空`);
      const st = it.stages || [];
      if (st.length && it.deadline) {
        const last = st[st.length - 1];
        if (last.node_time && last.node_time !== it.deadline)
          errors.push(`第 ${n} 条：最后一个阶段的节点时间（${last.node_time}）必须与限办时间（${it.deadline}）一致`);
      }
      if (!it.deadline) warnings.push(`第 ${n} 条：限办时间为空`);
    });
    return { ok: errors.length === 0 && items.length > 0,
             errors: items.length ? errors : ["至少需要 1 条督办事项"],
             warnings: warnings, normalized: items };
  }

  // ---------------------------------------------------------------
  // 拦截 fetch
  // ---------------------------------------------------------------
  const realFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    let url = typeof input === "string" ? input : (input && input.url) || "";
    let path = url;
    try {
      const u = new URL(url, window.location.origin);
      path = u.pathname;
    } catch (_) { /* 相对路径 */ }

    if (!path.startsWith("/api/")) {
      // 非 API 请求（页面跳转等）交回原生
      return realFetch(input, init);
    }

    let body = null;
    try { body = init && init.body ? JSON.parse(init.body) : null; } catch (_) { body = null; }
    const method = (init && init.method) || "GET";
    const data = pick(method, path, body);

    // 导出类接口：给一个提示，不返回真实文件
    if (path.includes("/export") || path.includes("/download")) {
      return Promise.resolve(new Response(
        JSON.stringify({ demo: true, message: "演示模式：实际部署后可下载真实文件" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      ));
    }

    const payload = data === null ? { demo: true } : data;
    return Promise.resolve(new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }));
  };

  // ---------------------------------------------------------------
  // 演示提示条
  // ---------------------------------------------------------------
  function addBanner() {
    if (document.getElementById("demo-banner")) return;
    const bar = document.createElement("div");
    bar.id = "demo-banner";
    bar.textContent = DEMO_BANNER_TEXT;
    bar.style.cssText = [
      "position:fixed", "left:0", "right:0", "bottom:0", "z-index:99999",
      "background:rgba(18,50,90,.94)", "color:#dbe7f5",
      "font:500 12.5px/1.6 -apple-system,BlinkMacSystemFont,'PingFang SC',sans-serif",
      "text-align:center", "padding:7px 12px", "letter-spacing:.3px",
      "pointer-events:none", "box-shadow:0 -2px 10px rgba(0,0,0,.12)",
    ].join(";");
    document.body.appendChild(bar);
    // 给页面底部留出空间，避免遮住按钮
    document.body.style.paddingBottom = "34px";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addBanner);
  } else {
    addBanner();
  }
})();
