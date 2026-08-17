function FolderTree({ folders, onFolderSelect, level = 0 }) {
  return (
    <ul className="flex flex-col gap-1">
      {folders.map((folder) => (
        <FolderTreeItem
          key={folder.id}
          folder={folder}
          level={level}
          onFolderSelect={onFolderSelect}
        />
      ))}
    </ul>
  );
}
export default FolderTree;