import { categories } from '../../../../lib/data';

export default function handler(req, res) {
  const { slug } = req.query;
  const category = categories.find((c) => c.slug === slug);

  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
}
