import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>
          © {new Date().getFullYear()} NoteHub. All rights reserved.
        </p>

        <div className={css.wrap}>
          <p>Developer: Ovcharenko Bohdan</p>

          <p>
            Contact us:{' '}
            <a href="mailto:bogdanovcharenko1997@gmail.com">
              bogdanovcharenko1997@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}