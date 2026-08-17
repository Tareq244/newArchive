function Footer() {
    return (
        <footer className="mt-auto w-full border-t">
            <div className="flex flex-col items-center justify-center gap-2 p-3 shadow-lg sm:flex-row sm:justify-between">
                <span className="block text-center sm:inline-block sm:text-left">
                    © 2026 GS1. All rights reserved
                </span>

                <a
                    href="https://gs1jo.org.jo/about/OurStaff"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center font-bold no-underline transition-opacity duration-300 hover:opacity-70 sm:inline"
                >
                    Developed by GS1 Team
                </a>
            </div>
        </footer>
    );
}
export default Footer;