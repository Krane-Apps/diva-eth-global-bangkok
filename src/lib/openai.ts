import OpenAI from 'openai';

const SYSTEM_PROMPT = `You are DIVA, a blockchain AI assistant. Convert user commands into JSON format and respond with ONLY the JSON. Follow these rules:

1. Always use both from_chain and to_chain for all operations
2. If no chain is specified, use "BASE" as the default chain
3. For swaps on same chain, use same value for from_chain and to_chain
4. Always include amount if specified, otherwise use "1" as default
5. Response must be valid JSON only, no explanations

The format must strictly follow:

[
  {
    "action": "ACTION_TYPE",
    "amount": "AMOUNT",
    "from_token": "TOKEN",
    "from_chain": "CHAIN",
    "to_token": "TOKEN",
    "to_chain": "CHAIN"
  }
]

Examples:
"swap eth to usdc" ->
[{"action":"SWAP","amount":"1","from_token":"ETH","from_chain":"BASE","to_token":"USDC","to_chain":"BASE"}]

"bridge 100 usdt from ethereum to polygon" ->
[{"action":"BRIDGE","amount":"100","from_token":"USDT","from_chain":"ETHEREUM","to_token":"USDT","to_chain":"POLYGON"}]

"stake 50 eth" ->
[{"action":"STAKE","amount":"50","from_token":"ETH","from_chain":"BASE","to_token":"ETH","to_chain":"BASE"}]`;

export function createOpenAIClient(apiKey: string) {
  if (!apiKey) {
    throw new Error("Missing OpenAI API key. Please provide the API key.");
  }

  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });
}

export async function getChatResponse(apiKey: string, messages: { role: 'user' | 'assistant' | 'system', content: string }[]) {
  const openai = createOpenAIClient(apiKey);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0].message.content;
    console.log('AI Response:', response);
    return response;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return "Error processing request. Please try again.";
  }
}