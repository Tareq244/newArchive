function SidebarLink({ item, isActive, onClick }) {
  const Icon = item.icon;

  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
        className={[
          "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left",
          "transition-all duration-300 hover:translate-x-1",
          isActive ? "font-semibold shadow-sm" : "",
        ].join(" ")}
      >
        <Icon className="size-5 shrink-0" />
        <span className="truncate">{item.label}</span>
      </button>
    </li>
  );
}

export default SidebarLink;