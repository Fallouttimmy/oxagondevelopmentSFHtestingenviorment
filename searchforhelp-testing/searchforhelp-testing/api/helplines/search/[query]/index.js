import { helplines } from '../../../../../lib/data';

export default function handler(req, res) {
  const { query } = req.query;
  const searchTerm = query.toLowerCase();

  const results = helplines.filter(
    (helpline) =>
      helpline.name.toLowerCase().includes(searchTerm) ||
      helpline.description.toLowerCase().includes(searchTerm) ||
      helpline.descriptionNl.toLowerCase().includes(searchTerm)
  );

  res.status(200).json(results);
}
