import css from './SidebarNotes.module.css';
import Link from 'next/link';
import { tagNames } from '@/lib/tags';




const SidebarNotes = () => {
  return (
    <>
    <Link href="/notes/action/create">Create note</Link>
    <ul className={css.menuList}>
    {/* список тегів */}
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {tagNames.map((tag) => <li className={css.menuItem} key={tag}>
                <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                    {tag}
                </Link>
            </li>)}
      </ul>
    </>
  );
};

export default SidebarNotes;