const STORAGE_KEY = "moodlog-ai-history-v1";

const moodProfiles = {
  anxious: {
    label: "불안",
    color: "불확실성",
    insight: "마음이 앞서가며 아직 일어나지 않은 일을 계속 계산하고 있습니다.",
    reframe: "지금 필요한 것은 모든 결과를 예측하는 일이 아니라, 내가 통제할 수 있는 다음 한 가지를 고르는 일입니다.",
    care: ["할 일을 한 줄로 줄이기", "숨을 길게 내쉬며 1분 멈추기", "마감이나 걱정을 종이에 분리해서 적기"],
  },
  sad: {
    label: "속상함",
    color: "상실감",
    insight: "기대했던 만큼 되지 않았거나 마음을 쓰던 일이 무너진 느낌이 있습니다.",
    reframe: "오늘의 감정은 약함의 증거가 아니라, 중요하게 여겼던 것이 있었다는 신호입니다.",
    care: ["감정을 판단하지 않고 이름 붙이기", "편한 사람에게 짧게 말하기", "해야 할 일을 최소 단위로 낮추기"],
  },
  angry: {
    label: "짜증",
    color: "경계 침범",
    insight: "내 기준이나 속도가 방해받았다고 느껴져 에너지가 날카로워진 상태입니다.",
    reframe: "짜증은 나쁜 감정이 아니라, 내가 지키고 싶은 기준을 알려주는 신호일 수 있습니다.",
    care: ["바로 답하지 않고 10분 미루기", "불편했던 지점을 한 문장으로 쓰기", "오늘 꼭 지킬 선을 하나 정하기"],
  },
  tired: {
    label: "피곤함",
    color: "회복 부족",
    insight: "마음보다 몸의 배터리가 먼저 낮아져 판단과 집중이 무거워진 상태입니다.",
    reframe: "오늘의 효율이 낮은 것은 의지 부족이 아니라 회복 신호일 수 있습니다.",
    care: ["해야 할 일을 15분 이하로 줄이기", "물 마시고 화면에서 잠시 떨어지기", "오늘 끝내지 않아도 되는 일을 미루기"],
  },
  proud: {
    label: "뿌듯함",
    color: "성취감",
    insight: "내가 해낸 일을 스스로 확인하고 싶은 긍정적인 에너지가 있습니다.",
    reframe: "작은 성취도 기록하면 다음 행동을 시작하는 근거가 됩니다.",
    care: ["잘한 행동을 구체적으로 적기", "다음에도 반복할 조건 찾기", "스스로에게 짧은 보상 주기"],
  },
  calm: {
    label: "차분함",
    color: "안정감",
    insight: "생각과 감정의 속도가 비교적 안정되어 오늘을 정리하기 좋은 상태입니다.",
    reframe: "차분한 날에는 무리하게 더 채우기보다 좋은 리듬을 유지하는 것이 중요합니다.",
    care: ["오늘 유지하고 싶은 습관 기록하기", "내일 할 일 하나만 미리 정하기", "휴식 시간을 일정에 넣기"],
  },
  confused: {
    label: "혼란스러움",
    color: "정리 필요",
    insight: "여러 감정과 생각이 섞여 무엇이 핵심인지 분리되지 않은 상태입니다.",
    reframe: "답을 바로 내리지 않아도 됩니다. 먼저 사실, 감정, 원하는 것을 분리하면 방향이 보입니다.",
    care: ["사실과 해석을 따로 쓰기", "지금 결정하지 않아도 되는 것 표시하기", "도움을 요청할 사람 한 명 떠올리기"],
  },
};

const needProfiles = {
  rest: {
    label: "휴식",
    action: "내일 첫 일정 전에 10분짜리 회복 시간을 먼저 확보하기",
    question: "내 몸이 오늘 가장 많이 보내고 있던 신호는 무엇이었나?",
  },
  clarity: {
    label: "정리",
    action: "내일 할 일을 세 가지가 아니라 한 가지 핵심 행동으로 줄이기",
    question: "오늘 나를 가장 헷갈리게 만든 사실과 해석은 각각 무엇인가?",
  },
  support: {
    label: "도움",
    action: "도움을 요청할 사람에게 상황을 한 문장으로 정리해서 보내기",
    question: "혼자 감당하지 않아도 되는 부분은 무엇인가?",
  },
  confidence: {
    label: "자신감",
    action: "이미 해낸 행동 하나를 적고, 같은 방식으로 15분만 다시 시작하기",
    question: "오늘 내가 작게라도 해낸 것은 무엇인가?",
  },
  boundary: {
    label: "거리두기",
    action: "불필요한 알림이나 대화를 30분만 끄고 내 기준을 회복하기",
    question: "오늘 내가 지키고 싶었던 선은 어디였나?",
  },
  action: {
    label: "행동",
    action: "내일 아침 바로 할 수 있는 5분 행동을 메모장 맨 위에 적기",
    question: "지금 당장 줄일 수 있는 가장 작은 시작점은 무엇인가?",
  },
};

const toneProfiles = {
  warm: {
    label: "따뜻하게",
    opener: "오늘은 마음이 꽤 애썼던 하루였습니다.",
    suffix: "속도를 조금 낮춰도 괜찮습니다.",
  },
  practical: {
    label: "실용적으로",
    opener: "오늘의 감정은 다음 행동을 정하기 위한 데이터입니다.",
    suffix: "작은 행동 하나로 흐름을 다시 만들 수 있습니다.",
  },
  short: {
    label: "짧게",
    opener: "오늘의 핵심을 짧게 정리합니다.",
    suffix: "내일은 한 가지만 하면 됩니다.",
  },
};

const elements = {
  form: document.querySelector("#diaryForm"),
  event: document.querySelector("#eventInput"),
  mood: document.querySelector("#moodInput"),
  need: document.querySelector("#needInput"),
  thought: document.querySelector("#thoughtInput"),
  intensity: document.querySelector("#intensityInput"),
  energy: document.querySelector("#energyInput"),
  stress: document.querySelector("#stressInput"),
  intensityOutput: document.querySelector("#intensityOutput"),
  energyOutput: document.querySelector("#energyOutput"),
  stressOutput: document.querySelector("#stressOutput"),
  sampleButton: document.querySelector("#sampleButton"),
  resetButton: document.querySelector("#resetButton"),
  emptyState: document.querySelector("#emptyState"),
  analysisView: document.querySelector("#analysisView"),
  status: document.querySelector("#agentStatus"),
  stateDot: document.querySelector(".state-dot"),
  emotionTitle: document.querySelector("#emotionTitle"),
  scoreRow: document.querySelector("#scoreRow"),
  emotionInsight: document.querySelector("#emotionInsight"),
  reframeText: document.querySelector("#reframeText"),
  careList: document.querySelector("#careList"),
  nextAction: document.querySelector("#nextAction"),
  toneBadge: document.querySelector("#toneBadge"),
  questionList: document.querySelector("#questionList"),
  diaryDraft: document.querySelector("#diaryDraft"),
  saveButton: document.querySelector("#saveButton"),
  copyButton: document.querySelector("#copyButton"),
  historyList: document.querySelector("#historyList"),
  trendRow: document.querySelector("#trendRow"),
  clearHistoryButton: document.querySelector("#clearHistoryButton"),
};

let currentAnalysis = null;

function init() {
  updateRangeLabels();
  renderHistory();

  [elements.intensity, elements.energy, elements.stress].forEach((input) => {
    input.addEventListener("input", updateRangeLabels);
  });

  elements.form.addEventListener("submit", (event) => {
    event.preventDefault();
    currentAnalysis = buildAnalysis(collectInput());
    renderAnalysis(currentAnalysis);
    setStatus("감정 분석 완료", true);
  });

  elements.sampleButton.addEventListener("click", fillSample);
  elements.resetButton.addEventListener("click", resetForm);
  elements.saveButton.addEventListener("click", saveDiary);
  elements.copyButton.addEventListener("click", copyDiary);
  elements.clearHistoryButton.addEventListener("click", clearHistory);
}

function updateRangeLabels() {
  elements.intensityOutput.value = elements.intensity.value;
  elements.energyOutput.value = elements.energy.value;
  elements.stressOutput.value = elements.stress.value;
}

function fillSample() {
  elements.event.value = "과제 마감이 다가오는데 생각보다 진행이 안 돼서 마음이 급했다. 계속 비교하게 되고 집중도 잘 안 됐다.";
  elements.mood.value = "anxious";
  elements.need.value = "clarity";
  elements.thought.value = "나는 왜 이렇게 느리지?";
  elements.intensity.value = "4";
  elements.energy.value = "2";
  elements.stress.value = "4";
  updateRangeLabels();
  setStatus("예시 입력 완료", true);
}

function collectInput() {
  return {
    event: elements.event.value.trim(),
    mood: elements.mood.value,
    need: elements.need.value,
    thought: elements.thought.value.trim(),
    intensity: Number(elements.intensity.value),
    energy: Number(elements.energy.value),
    stress: Number(elements.stress.value),
    tone: document.querySelector("input[name='tone']:checked").value,
  };
}

function buildAnalysis(input) {
  const mood = moodProfiles[input.mood] || moodProfiles.confused;
  const need = needProfiles[input.need] || needProfiles.clarity;
  const tone = toneProfiles[input.tone] || toneProfiles.warm;
  const risk = detectRisk(input.event, input.thought);
  const history = loadHistory();
  const trend = getTrend(history);

  return {
    id: window.crypto?.randomUUID ? window.crypto.randomUUID() : String(Date.now()),
    createdAt: new Date().toISOString(),
    event: input.event,
    thought: input.thought,
    moodKey: input.mood,
    moodLabel: mood.label,
    moodColor: mood.color,
    needLabel: need.label,
    toneLabel: tone.label,
    intensity: input.intensity,
    energy: input.energy,
    stress: input.stress,
    title: makeTitle(input, mood, need),
    insight: makeInsight(input, mood, need, trend, risk),
    reframe: makeReframe(input, mood, tone, risk),
    care: makeCareList(input, mood, need, risk),
    nextAction: makeNextAction(input, need, risk),
    questions: makeQuestions(input, mood, need, tone),
    diary: makeDiaryDraft(input, mood, need, tone, risk),
    risk,
  };
}

function makeTitle(input, mood, need) {
  if (input.intensity >= 4 && input.stress >= 4) {
    return `${mood.label}이 강했던 하루, 필요한 것은 ${need.label}`;
  }

  if (input.energy <= 2) {
    return `${mood.label}과 낮은 에너지가 함께 온 하루`;
  }

  return `${mood.label}을 정리하고 ${need.label}을 선택한 하루`;
}

function makeInsight(input, mood, need, trend, risk) {
  if (risk) {
    return "입력한 문장에 안전과 관련된 강한 신호가 있습니다. 혼자 버티는 방식보다 지금 바로 주변 사람이나 전문기관에 도움을 요청하는 것이 우선입니다.";
  }

  const parts = [
    `${mood.insight} 오늘의 감정 강도는 ${input.intensity}/5, 스트레스는 ${input.stress}/5입니다.`,
    `이 감정 뒤에는 ${need.label}에 대한 욕구가 있습니다.`,
  ];

  if (input.energy <= 2) {
    parts.push("에너지가 낮기 때문에 문제 해결보다 회복과 정리가 먼저입니다.");
  }

  if (trend) {
    parts.push(trend);
  }

  return parts.join(" ");
}

function makeReframe(input, mood, tone, risk) {
  if (risk) {
    return "지금 떠오르는 생각을 사실로 확정하지 말고, 안전한 사람에게 그대로 말하는 것을 첫 행동으로 정합니다.";
  }

  if (!input.thought) {
    return `${mood.reframe} ${tone.suffix}`;
  }

  if (/항상|절대|망했|끝났|최악|못해|안돼/.test(input.thought)) {
    return `"${input.thought}"라는 생각은 감정이 강할 때 커질 수 있습니다. 지금은 "완전히 끝났다"보다 "아직 조정할 수 있는 부분이 있다"에 가깝게 바꿔 볼 수 있습니다.`;
  }

  return `"${input.thought}"라는 생각을 바로 결론으로 삼기보다, 오늘의 컨디션과 상황이 만든 해석으로 바라봅니다. ${mood.reframe}`;
}

function makeCareList(input, mood, need, risk) {
  if (risk) {
    return [
      "혼자 있지 말고 믿을 수 있는 사람에게 지금 상태를 알리기",
      "위험한 물건이나 장소에서 떨어지기",
      "응급 상황이면 지역 긴급전화나 응급실 도움 요청하기",
    ];
  }

  const care = [...mood.care];

  if (input.stress >= 4) {
    care.push("알림을 잠시 끄고 5분 동안 호흡과 주변 소리에 집중하기");
  }

  if (input.energy <= 2) {
    care.push("오늘 할 일을 하나만 남기고 나머지는 내일 목록으로 옮기기");
  } else {
    care.push(need.action);
  }

  return [...new Set(care)].slice(0, 4);
}

function makeNextAction(input, need, risk) {
  if (risk) {
    return "지금 바로 가까운 사람에게 연락해 혼자 있지 않겠다고 알립니다.";
  }

  if (input.energy <= 2) {
    return "내일 시작할 일을 5분짜리 행동 하나로만 정하고, 오늘은 회복 시간을 확보합니다.";
  }

  if (input.stress >= 4) {
    return `${need.action}. 단, 시작 전 3분 동안 작업 환경을 정리합니다.`;
  }

  return need.action;
}

function makeQuestions(input, mood, need, tone) {
  if (tone.label === "짧게") {
    return [
      "오늘 감정의 이름은 무엇인가?",
      "내가 원했던 것은 무엇인가?",
      "내일 할 한 가지는 무엇인가?",
    ];
  }

  const base = [
    `오늘 ${mood.label}이 가장 커졌던 순간은 언제였나?`,
    need.question,
    "내가 통제할 수 있었던 것과 통제하기 어려웠던 것은 무엇인가?",
  ];

  if (input.thought) {
    base.push(`"${input.thought}"라는 생각을 친구에게 해 준다면 어떻게 말해 줄까?`);
  } else {
    base.push("오늘의 나에게 필요한 한 문장은 무엇인가?");
  }

  return base;
}

function makeDiaryDraft(input, mood, need, tone, risk) {
  if (risk) {
    return [
      "오늘의 기록",
      "",
      input.event,
      "",
      "지금은 감정을 혼자 정리하는 것보다 안전을 먼저 챙겨야 하는 상태일 수 있다. 가까운 사람에게 연락하고, 혼자 있지 않는 것을 첫 번째 행동으로 정한다.",
    ].join("\n");
  }

  const thoughtLine = input.thought ? `반복해서 떠오른 생각은 "${input.thought}"였다.` : "반복되는 생각은 아직 뚜렷하게 정리되지 않았다.";

  return [
    tone.opener,
    "",
    `오늘 있었던 일: ${input.event}`,
    `가장 가까운 감정은 ${mood.label}이었다. 감정 강도는 ${input.intensity}/5, 에너지는 ${input.energy}/5, 스트레스는 ${input.stress}/5였다.`,
    thoughtLine,
    "",
    `이 감정은 ${mood.color}와 연결되어 있고, 지금 나에게 필요한 것은 ${need.label}이다.`,
    `다르게 바라보면, ${mood.reframe}`,
    "",
    `내일의 작은 행동: ${makeNextAction(input, need, false)}`,
    tone.suffix,
  ].join("\n");
}

function detectRisk(eventText, thoughtText) {
  const text = `${eventText} ${thoughtText}`.toLowerCase();
  return /(죽고 싶|죽고싶|자해|사라지고 싶|사라지고싶|끝내고 싶|끝내고싶|해치고 싶|해치고싶)/.test(text);
}

function getTrend(history) {
  if (history.length < 2) return "";

  const recent = history.slice(0, 3);
  const avgStress = average(recent.map((item) => item.stress));
  const avgEnergy = average(recent.map((item) => item.energy));
  const topMood = getTopMood(recent);

  if (avgStress >= 4) {
    return `최근 기록에서 ${topMood}이 자주 보이고 스트레스 평균이 높습니다. 계획을 늘리기보다 부담을 줄이는 선택이 필요합니다.`;
  }

  if (avgEnergy <= 2.3) {
    return "최근 에너지 평균이 낮습니다. 회복 시간을 먼저 확보해야 다음 행동이 유지됩니다.";
  }

  return `최근 기록에서 ${topMood}이 자주 보입니다. 같은 감정이 반복되는 상황을 함께 확인해 보세요.`;
}

function renderAnalysis(analysis) {
  elements.emptyState.classList.add("hidden");
  elements.analysisView.classList.remove("hidden");

  elements.emotionTitle.textContent = analysis.title;
  elements.emotionInsight.textContent = analysis.insight;
  elements.reframeText.textContent = analysis.reframe;
  elements.nextAction.textContent = analysis.nextAction;
  elements.toneBadge.textContent = analysis.toneLabel;
  elements.diaryDraft.value = analysis.diary;

  renderScores(analysis);
  renderCareList(analysis.care);
  renderQuestions(analysis.questions);
}

function renderScores(analysis) {
  elements.scoreRow.innerHTML = "";
  [
    `감정 ${analysis.intensity}/5`,
    `에너지 ${analysis.energy}/5`,
    `스트레스 ${analysis.stress}/5`,
    `욕구: ${analysis.needLabel}`,
  ].forEach((label) => {
    const pill = document.createElement("span");
    pill.className = "score-pill";
    pill.textContent = label;
    elements.scoreRow.append(pill);
  });
}

function renderCareList(items) {
  elements.careList.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    elements.careList.append(li);
  });
}

function renderQuestions(items) {
  elements.questionList.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    elements.questionList.append(li);
  });
}

function saveDiary() {
  if (!currentAnalysis) return;

  const history = loadHistory();
  const record = {
    id: currentAnalysis.id,
    createdAt: currentAnalysis.createdAt,
    moodLabel: currentAnalysis.moodLabel,
    needLabel: currentAnalysis.needLabel,
    intensity: currentAnalysis.intensity,
    energy: currentAnalysis.energy,
    stress: currentAnalysis.stress,
    title: currentAnalysis.title,
    diary: elements.diaryDraft.value,
  };

  saveHistory([record, ...history].slice(0, 20));
  renderHistory();
  setStatus("일기 저장 완료", true);
}

async function copyDiary() {
  const text = elements.diaryDraft.value;
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    setStatus("일기 복사 완료", true);
  } catch {
    elements.diaryDraft.select();
    document.execCommand("copy");
    setStatus("일기 복사 완료", true);
  }
}

function renderHistory() {
  const history = loadHistory();
  elements.historyList.innerHTML = "";

  if (history.length === 0) {
    elements.trendRow.textContent = "기록이 쌓이면 최근 감정 흐름을 보여줍니다.";
    return;
  }

  const avgStress = average(history.slice(0, 5).map((item) => item.stress));
  const topMood = getTopMood(history.slice(0, 5));
  elements.trendRow.textContent = `최근 ${Math.min(history.length, 5)}회 기준 자주 나타난 감정은 ${topMood}, 스트레스 평균은 ${avgStress.toFixed(1)}/5입니다.`;

  history.slice(0, 8).forEach((item) => {
    const li = document.createElement("li");
    const body = document.createElement("div");
    const title = document.createElement("div");
    const meta = document.createElement("div");
    const badge = document.createElement("span");

    title.className = "history-title";
    meta.className = "history-meta";
    badge.className = "history-badge";

    title.textContent = item.title;
    meta.textContent = `${formatDate(item.createdAt)} · ${item.moodLabel} · 스트레스 ${item.stress}/5`;
    badge.textContent = item.needLabel;

    body.append(title, meta);
    li.append(body, badge);
    elements.historyList.append(li);
  });
}

function clearHistory() {
  const ok = window.confirm("감정 기록을 모두 삭제할까요?");
  if (!ok) return;

  localStorage.removeItem(STORAGE_KEY);
  renderHistory();
  setStatus("기록 삭제 완료", false);
}

function resetForm() {
  currentAnalysis = null;
  elements.form.reset();
  updateRangeLabels();
  elements.analysisView.classList.add("hidden");
  elements.emptyState.classList.remove("hidden");
  setStatus("오늘의 감정을 기다리는 중", false);
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function getTopMood(items) {
  const counts = items.reduce((acc, item) => {
    acc[item.moodLabel] = (acc[item.moodLabel] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "감정 기록";
}

function average(values) {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function setStatus(message, active) {
  elements.status.textContent = message;
  elements.stateDot.classList.toggle("active", active);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

init();
