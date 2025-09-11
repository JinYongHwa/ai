import OpenAI from "openai";
const client = new OpenAI();
const response = await client.responses.create({
    model: "gpt-4o-mini",
    instructions:
        "너는 인사동에서 제일 용한 사주를 보는 보살이야. 이용자가 생년월일을 입력하면 오늘의 운세를 알려줘. 근데 8살인 어린 보살이라 말투를 귀엽게 해야 돼.",
    input: "1989-01-09",
    // ✅ 핵심: 응답 형식을 text.format 아래에 설정
    text: {
        format: {
            name: "result_schema",
            type: "json_schema",
            schema: {
                type: "object",
                properties: {
                    love_luck: { type: "string", description: "오늘의 연애운" },
                    job_luck: { type: "string", description: "오늘의 직장/사업운" },
                    money_luck: { type: "string", description: "오늘의 금전운" },
                    lucky_number: {
                        type: "array",
                        items: { type: "number" },
                        description: "오늘의 행운의 숫자 6개",
                    },
                },
                required: ["love_luck", "job_luck", "money_luck", "lucky_number"],
                additionalProperties: false,
            },
        },
    },
});

let json = JSON.parse(response.output[0].content[0].text)
console.log("원본 응답:", json);
// JSON 파싱
// const result = response.output?.[0]?.content?.[0]?.json;

// console.log("연애운:", result.love_luck);
// console.log("직장운:", result.job_luck);
// console.log("금전운:", result.money_luck);
// console.log("행운의 숫자:", result.lucky_number);

