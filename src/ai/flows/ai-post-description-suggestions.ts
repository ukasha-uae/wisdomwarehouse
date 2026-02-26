'use server';
/**
 * @fileOverview A Genkit flow for generating creative and engaging descriptions for daily activity posts.
 *
 * - aiPostDescriptionSuggestions - A function that handles the generation of post descriptions.
 * - AIPostDescriptionSuggestionsInput - The input type for the aiPostDescriptionSuggestions function.
 * - AIPostDescriptionSuggestionsOutput - The return type for the aiPostDescriptionSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z, Part} from 'genkit';

const AIPostDescriptionSuggestionsInputSchema = z.object({
  mediaUrls: z
    .array(z.string())
    .optional()
    .describe(
      'An array of data URIs for images or videos. Each URI must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
  keywords: z
    .string()
    .optional()
    .describe(
      'Optional keywords provided by the teacher to guide the description generation.'
    ),
});
export type AIPostDescriptionSuggestionsInput = z.infer<
  typeof AIPostDescriptionSuggestionsInputSchema
>;

const AIPostDescriptionSuggestionsOutputSchema = z.object({
  description: z
    .string()
    .describe(
      'Suggested creative and engaging description for the daily activity post.'
    ),
});
export type AIPostDescriptionSuggestionsOutput = z.infer<
  typeof AIPostDescriptionSuggestionsOutputSchema
>;

export async function aiPostDescriptionSuggestions(
  input: AIPostDescriptionSuggestionsInput
): Promise<AIPostDescriptionSuggestionsOutput> {
  return aiPostDescriptionSuggestionsFlow(input);
}

const aiPostDescriptionSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiPostDescriptionSuggestionsFlow',
    inputSchema: AIPostDescriptionSuggestionsInputSchema,
    outputSchema: AIPostDescriptionSuggestionsOutputSchema,
  },
  async (input) => {
    const parts: Part[] = [];

    parts.push({
      text:
        'You are a creative assistant helping teachers write engaging descriptions for daily activity posts.',
    });
    parts.push({
      text:
        'Generate a concise and engaging description suitable for parents, highlighting key activities or learning moments. Focus on positive language and capture the essence of children\'s activities.',
    });

    if (input.keywords) {
      parts.push({text: `Additional context or keywords: ${input.keywords}`});
    }

    if (input.mediaUrls && input.mediaUrls.length > 0) {
      parts.push({
        text: 'Here are the images/videos from the daily activity. Describe what you see:\n',
      });
      input.mediaUrls.forEach((url) => {
        parts.push({media: {url: url}});
      });
    }

    const {output} = await ai.generate({
      prompt: parts,
    });

    return {description: output.text()!};
  }
);
