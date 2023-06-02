import { SolveQuestion } from "@/store/useSolveQuestion";
import { ItemProperty } from "~/common/type";

export type QuestionTypeShortPram = "시스템보안" | "네트워크보안";

export const useQuestion = () => {
  /** 단단형 */
  async function questionTypeShortAnswer(
    questionTypes: QuestionTypeShortPram[],
    isSolveType = false
  ) {
    const fetchLists: any[] = [];
    const score = 3;

    const questionMaps: { [key: string]: any } = {
      시스템보안: "/api/chapter-01-short",
      네트워크보안: "/api/capter-02-short",
    };

    questionTypes.forEach((v) => {
      if (v in questionMaps) {
        fetchLists.push(
          useFetch(questionMaps[v]).then((res) => res.data.value)
        );
      }
    });

    // console.log(questionTypes);
    // const 시스템보안단답 = useFetch("/api/chapter-01-short").then(
    //   (res) => res.data.value
    // );
    // fetchLists.push(시스템보안단답);
    // const 보안쪽 = useFetch("/api/chapter-01-short").then(
    //   (res) => res.data.value
    // );
    // fetchLists.push(보안쪽);

    const questionLists = await Promise.all(fetchLists);

    return questionLists
      .map((v) =>
        isSolveType ? solveDataParser(v, score) : fetchDataParser(v)
      )
      .flat(2);
  }

  /** 서술형 */
  async function questionTypeDescriptive(
    questionTypes: QuestionTypeShortPram[]
  ) {
    const fetchLists: any[] = [];
    const score = 12;

    const questionMaps: { [key: string]: any } = {
      시스템보안: "/api/chapter-01-short",
      네트워크보안: "/api/capter-02-short",
    };

    questionTypes.forEach((v) => {
      if (v in questionMaps) {
        fetchLists.push(
          useFetch(questionMaps[v]).then((res) => res.data.value)
        );
      }
    });

    const questionLists = await Promise.all(fetchLists);

    return questionLists.map((v) => solveDataParser(v, score)).flat(2);
  }
  /** 실무형 */
  async function questionTypeWorking(questionTypes: QuestionTypeShortPram[]) {
    const fetchLists: any[] = [];
    const score = 16;

    const questionMaps: { [key: string]: any } = {
      시스템보안: "/api/chapter-01-short",
      네트워크보안: "/api/capter-02-short",
    };

    questionTypes.forEach((v) => {
      if (v in questionMaps) {
        fetchLists.push(
          useFetch(questionMaps[v]).then((res) => res.data.value)
        );
      }
    });

    const questionLists = await Promise.all(fetchLists);

    return questionLists.map((v) => solveDataParser(v, score)).flat(2);
  }

  const getAllQuestion = async () => {
    const short = questionTypeShortAnswer(["시스템보안", "네트워크보안"]);

    const questionLists = (await Promise.all([short])).flat(2);
    return questionLists;
  };

  return {
    questionTypeShortAnswer,
    questionTypeDescriptive,
    questionTypeWorking,
    getAllQuestion,
  };
};

export default useQuestion;

function solveDataParser(data: any, score: number) {
  if (!data) return;
  const questtion: { [key: string]: any } = toRaw(data);

  const part1 = Object.keys(questtion).map((key): SolveQuestion => {
    const item = questtion[key];

    item["score"] = score;
    item["index"] = key;
    return { item, isAnswer: null };
  });

  return [...part1];
}

function fetchDataParser(data: any) {
  if (!data) return;
  const questtion: { [key: string]: any } = toRaw(data);

  const part1 = Object.keys(questtion).map((key): ItemProperty => {
    const item = questtion[key];

    item["index"] = key;
    return item;
  });

  return [...part1];
}
