import { useState, useEffect, useRef } from 'react';

interface MenuItem {
  label: string;
  link: string;
  openInNewTab?: boolean;
}

interface Props {
  menuItems: MenuItem[];
}

export default function MobileNavMenu({ menuItems }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus trap and initial focus
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      const firstFocusable = drawerRef.current.querySelector<HTMLElement>(
        'button, a[href]'
      );
      firstFocusable?.focus();
    }
  }, [isOpen]);

  const closeDrawer = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      {/* Hamburger Button - visible on mobile only */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg text-slate-700 hover:text-brand-teal hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <span className="font-bold text-lg text-slate-900">Menu</span>
          <button
            onClick={closeDrawer}
            className="flex items-center justify-center w-11 h-11 rounded-lg text-slate-700 hover:text-brand-teal hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="py-4">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  onClick={closeDrawer}
                  target={item.openInNewTab ? '_blank' : undefined}
                  rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                  className="flex items-center px-6 py-4 text-lg text-slate-700 hover:text-brand-teal hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-teal min-h-[44px]"
                >
                  {item.label}
                </a>
              </li>
            ))}
            {/* Hardcoded Contact Us link */}
            <li>
              <a
                href="tel:01706354151"
                onClick={closeDrawer}
                className="flex items-center px-6 py-4 text-lg text-slate-700 hover:text-brand-teal hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-teal min-h-[44px]"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="https://www.gofundme.com/f/spotland-community-association"
                onClick={closeDrawer}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center mx-6 mt-2 px-6 py-4 text-lg font-semibold text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-teal min-h-[44px] shadow-sm hover:brightness-95"
                style={{ backgroundColor: '#E2725B' }} // terracotta
                aria-label="Donate (opens in new tab)"
              >
                Donate
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
