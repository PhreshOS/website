import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

const search = createFromSource(source);

export const dynamic = 'force-static';

export const GET = search.staticGET;
