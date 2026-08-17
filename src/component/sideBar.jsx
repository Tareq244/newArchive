import { useEffect, useState } from "react";
import FolderTree  from "../helper/sideBar/folderTree";
import FolderTreeItem  from "../helper/sideBar/folderTreeItem";
import SidebarLink  from "../helper/sideBar/sidebarLink";

export default function Sidebar({
  userName,
  folders = [],
  activePage = "home",
  onNavigate,
  onFolderSelect,
}) {
  const [currentTime, setCurrentTime] = useState("");
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Intl.DateTimeFormat("en-JO", {
          dateStyle: "medium",
          timeStyle: "medium",
        }).format(new Date()),
      );
    };

    updateTime();

    const timer = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const navigationItems = [
    {
      id: "home",
      label: "Home",
      icon: HomeIcon,
    },
    {
      id: "users",
      label: "Users",
      icon: UsersIcon,
    },
    {
      id: "settings",
      label: "Settings",
      icon: SettingsIcon,
    },
  ];

  return (
    <aside className="flex h-full w-[250px] shrink-0 flex-col overflow-hidden shadow-lg">
      <header className="border-b p-4">
        <h2 className="mb-0 truncate text-xl font-bold">
          {userName || "User"}
        </h2>

        <time
          dateTime={new Date().toISOString()}
          className="mt-1 block text-sm opacity-60"
        >
          {currentTime}
        </time>
      </header>

      <nav className="flex-1 overflow-y-auto p-3" aria-label="Main navigation">
        <ul className="flex flex-col gap-2">
          {navigationItems.slice(0, 1).map((item) => (
            <SidebarLink
              key={item.id}
              item={item}
              isActive={activePage === item.id}
              onClick={() => onNavigate?.(item.id)}
            />
          ))}

          <li>
            <button
              type="button"
              onClick={() =>
                setIsDocumentsOpen((currentValue) => !currentValue)
              }
              className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-all duration-300 hover:translate-x-1"
              aria-expanded={isDocumentsOpen}
              aria-controls="documents-menu"
            >
              <span className="flex min-w-0 items-center gap-3">
                <FolderOpenIcon className="size-5 shrink-0" />
                <span className="truncate">Documents</span>
              </span>

              <ChevronRightIcon
                className={[
                  "size-4 shrink-0 transition-transform duration-300",
                  isDocumentsOpen ? "rotate-90" : "",
                ].join(" ")}
              />
            </button>

            <div
              id="documents-menu"
              className={[
                "grid transition-all duration-300",
                isDocumentsOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              ].join(" ")}
            >
              <div className="overflow-hidden">
                <div className="ml-2 mt-2 flex flex-col gap-1">
                  {folders.length > 0 ? (
                    <FolderTree
                      folders={folders}
                      onFolderSelect={onFolderSelect}
                    />
                  ) : (
                    <span className="ml-2 text-sm opacity-60">
                      No folders
                    </span>
                  )}
                </div>
              </div>
            </div>
          </li>

          {navigationItems.slice(1).map((item) => (
            <SidebarLink
              key={item.id}
              item={item}
              isActive={activePage === item.id}
              onClick={() => onNavigate?.(item.id)}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}







