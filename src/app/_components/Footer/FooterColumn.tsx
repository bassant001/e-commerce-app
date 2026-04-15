
export default function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-white font-bold text-lg mb-6">{title}</h4>
      <ul className="space-y-3 text-sm">
        {links.map((link) => (
          <li
            key={link}
            className="hover:text-[#48a15e] cursor-pointer transition-colors"
          >
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}

