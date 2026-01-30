import { helplines } from '../../../../../lib/data';

export default function handler(req, res) {
  const { slug } = req.query;
  const filteredHelplines = helplines.filter((helpline) => helpline.categoryId === slug);

  res.status(200).json(filteredHelplines);
}
