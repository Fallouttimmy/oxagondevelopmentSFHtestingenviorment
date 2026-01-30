import { helplines } from '../../../lib/data';

export default function handler(req, res) {
  const featuredHelplines = helplines.filter((helpline) => helpline.isFeatured);
  res.status(200).json(featuredHelplines);
}
