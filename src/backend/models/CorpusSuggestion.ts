import mongoose from 'mongoose';
import WordTags from '../shared/constants/WordTags';
import { toJSONPlugin, toObjectPlugin } from './plugins';
import { uploadCorpusPronunciation } from './plugins/pronunciationHooks';

const { Schema, Types } = mongoose;
const corpusSuggestionSchema = new Schema({
  originalCorpusId: { type: Types.ObjectId, ref: 'Corpus', default: null },
  title: { type: String, required: true },
  body: { type: String, required: true },
  media: { type: String, default: '' },
  tags: {
    type: [{
      type: String,
      enum: Object.values(WordTags).map(({ value }) => value),
    }],
    default: [],
  },
  editorsNotes: { type: String, default: '' },
  authorEmail: { type: String, default: '' },
  authorId: { type: String, default: '' },
  approvals: { type: [{ type: String }], default: [] },
  denials: { type: [{ type: String }], default: [] },
  merge: { type: Types.ObjectId, ref: 'Corpus', default: null },
  mergedBy: { type: String, default: null },
  userInteractions: { type: [{ type: String }], default: [] },
}, { toObject: toObjectPlugin, timestamps: true });

toJSONPlugin(corpusSuggestionSchema);
uploadCorpusPronunciation(corpusSuggestionSchema);

export default mongoose.model('CorpusSuggestion', corpusSuggestionSchema);
