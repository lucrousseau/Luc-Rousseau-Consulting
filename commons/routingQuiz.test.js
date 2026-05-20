const {
  getRoutingQuizMaxDepth,
  getRoutingQuizQuestionNumber,
  getRoutingQuizStep,
} = require("./routingQuiz");
const { SITUATIONS_QUIZ_STEPS, SITUATIONS_QUIZ_ROOT_STEP_ID } = require("./situationsQuiz");

describe("routingQuiz", () => {
  const steps = {
    root: {
      questionKey: "q1",
      options: [
        { id: "a", next: "step2" },
        { id: "b", result: "direct" },
      ],
    },
    step2: {
      questionKey: "q2",
      options: [{ id: "c", result: "nested" }],
    },
  };

  it("getRoutingQuizStep returns a step by id", () => {
    expect(getRoutingQuizStep(steps, "root").questionKey).toBe("q1");
  });

  it("getRoutingQuizMaxDepth returns longest path to a result", () => {
    expect(getRoutingQuizMaxDepth(steps, "root")).toBe(2);
  });

  it("getRoutingQuizQuestionNumber follows the step stack", () => {
    expect(getRoutingQuizQuestionNumber(["root"], "root")).toBe(1);
    expect(getRoutingQuizQuestionNumber(["root", "step2"], "root")).toBe(2);
  });

  it("situations quiz tree has depth 2", () => {
    expect(getRoutingQuizMaxDepth(SITUATIONS_QUIZ_STEPS, SITUATIONS_QUIZ_ROOT_STEP_ID)).toBe(2);
  });
});
