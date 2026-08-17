function FolderTreeItem({ folder, level, onFolderSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const children = folder.children ?? [];
  const hasChildren = children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen((currentValue) => !currentValue);
    }

    onFolderSelect?.(folder);
  };

  return (
    <li>
      <button
        type="button"
        onClick={handleClick}
        className="flex w-full items-center gap-2 rounded-lg py-2 pr-3 text-left transition-opacity duration-300 hover:opacity-70"
        style={{ paddingLeft: `${level * 12 + 12}px` }}
        aria-expanded={hasChildren ? isOpen : undefined}
      >
        {hasChildren ? (
          <ChevronRightIcon
            className={[
              "size-3 shrink-0 transition-transform duration-300",
              isOpen ? "rotate-90" : "",
            ].join(" ")}
          />
        ) : (
          <span className="w-3 shrink-0" />
        )}

        <FolderIcon className="size-4 shrink-0" />

        <span className="truncate">{folder.name}</span>
      </button>

      {hasChildren && isOpen && (
        <FolderTree
          folders={children}
          level={level + 1}
          onFolderSelect={onFolderSelect}
        />
      )}
    </li>
  );
}
export default FolderTreeItem;