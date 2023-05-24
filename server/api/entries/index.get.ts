import type { RawEntry } from '../../utils/transform-entry';

export default defineEventHandler(async (event) => {
	const db = useDatabase(event);
	const result = await db.prepare('SELECT name, url, avatars, boxes FROM templates ORDER BY uses DESC').all<RawEntry>();
	if (result.success) return result.results!.map(transformTemplateEntry);

	throw createError({
		statusCode: 500,
		statusMessage: result.error ?? 'Received an error'
	});
});
