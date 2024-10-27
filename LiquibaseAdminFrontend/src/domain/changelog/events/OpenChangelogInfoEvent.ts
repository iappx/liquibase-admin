import { Changelog } from '@/api/entities/Changelog'

export class OpenChangelogInfoEvent {
    constructor(
        public readonly changelog: Changelog,
    ) {
    }
}
