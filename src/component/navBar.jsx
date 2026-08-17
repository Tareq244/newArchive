import { useState } from "react";

import { createFolder } from "../services/folderService";
import { uploadFile } from "../services/fileService";

import DarkLightMode from "../helper/toggle/DarkLightMode";

import { MenuIcon, CloseIcon, FolderPlusIcon, UploadIcon, SearchIcon, MoonIcon, ChevronDownIcon, LogoutIcon } from '../icons/Icons';
import Logout from "../services/logout/Logout";

import Swal from "sweetalert2";

export default function Navbar({ userName, onSearch }) {

  const logo = "/assets/images/logo1.png";
  const avatar = "/assets/images/avatar.jpg";
  const createfolder="/assets/gif/folder.gif";
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch?.(searchTerm.trim());
  };

  // const handleCreateFolder = async (folderName) => {
  //   try {
  //     const result = await createFolder({
  //       name: folderName,
  //       parentId: currentParentId,
  //     });
  //     console.log("Created:", result);
  //     // هون تعمل refresh للـ folders
  //     // أو تضيف الفولدر الجديد مباشرة للـ state

  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const handleCreateFolder = async () => {
    const result = await Swal.fire({
      imageUrl: createfolder,
      imageWidth: 150,
      imageHeight: 150,
      title: "Create Folder",
      input: "text",
      inputLabel: "Folder Name",
      inputPlaceholder: "Enter folder name...",
      showCancelButton: true,
      confirmButtonText: "Create",
      cancelButtonText: "Cancel",
      reverseButtons: true,

      inputValidator: (value) => {
        if (!value || !value.trim()) {
          return "Please enter a folder name.";
        }
      },

      customClass: {
        popup: "login-swal-popup",
      },
    });

    if (!result.isConfirmed) {
      return;
    }

    const folderName = result.value.trim();

    try {
      const createdFolder = await createFolder({
        name: folderName,
        parentId: currentParentId,
      });

      console.log("Created:", createdFolder);

      await Swal.fire({
        icon: "success",
        title: "Folder Created",
        text: `"${folderName}" created successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error) {
      console.error("Create folder error:", error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.message || "Unable to create folder.",
      });
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const result = await uploadFile(file, parentId);

      console.log("File uploaded:", result);

    } catch (error) {
      console.error("Upload error:", error.message);
    }
  };

  return (
    <nav className="relative w-full border-b px-4 py-2 shadow-lg">
      <div className="mx-auto flex w-full items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="https://gs1jo.org.jo/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GS1 Jordan website"
          className="shrink-0"
        >
          <img
            src={logo}
            alt="GS1"
            width="55"
            height="50"
            className="h-[50px] w-[55px] object-contain transition-transform duration-300 hover:scale-110 hover:rotate-3"
          />
        </a>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="rounded-lg border p-2 transition-transform duration-300 hover:scale-105 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <CloseIcon className="size-6" />
          ) : (
            <MenuIcon className="size-6" />
          )}
        </button>

        {/* Navigation content */}
        <div
          className={[
            "absolute left-0 top-full z-40 w-full border-b p-4 shadow-lg",
            "lg:static lg:flex lg:w-auto lg:flex-1 lg:items-center lg:border-0 lg:p-0 lg:shadow-none",
            isMenuOpen ? "block" : "hidden lg:flex",
          ].join(" ")}
        >
          {/* File actions */}
          <div className="flex items-center justify-center gap-2 lg:justify-start">
            <button
              type="button"
              onClick={handleCreateFolder}
              title="Create Folder"
              className="rounded-lg p-2 transition-transform duration-300 hover:scale-110"
            >
              <FolderPlusIcon className="size-6" />
            </button>

            <button
              type="button"
              onChange={handleFileChange}
              title="Upload File"
              className="rounded-lg p-2 transition-transform duration-300 hover:scale-110"
            >
              <UploadIcon className="size-6" />
            </button>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            role="search"
            className="mx-auto my-4 flex w-full max-w-xl items-center gap-2 lg:my-0 lg:w-2/5"
          >
            <label htmlFor="file-search" className="sr-only">
              Search for files
            </label>

            <input
              id="file-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search for files..."
              className="min-w-0 flex-1 rounded-lg border px-4 py-2 outline-none transition-shadow duration-300 focus:ring-2"
            />

            <button
              type="submit"
              aria-label="Search"
              className="rounded-lg border p-2 transition-transform duration-300 hover:scale-105"
            >
              <SearchIcon className="size-5" />
            </button>
          </form>

          {/* Theme and profile */}
          <div className="flex items-center justify-center gap-3 lg:justify-end">
            {/* <button
              type="button"
              onClick={onToggleTheme}
              title="Toggle Dark Mode"
              className="rounded-lg p-2 transition-transform duration-300 hover:rotate-12 hover:scale-110"
            >
              <MoonIcon className="size-6" />
            </button> */}
            <DarkLightMode />

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen((current) => !current)}
                className="flex items-center gap-2 rounded-full"
                aria-label="Open profile menu"
                aria-expanded={isProfileOpen}
              >
                <img
                  src={avatar}
                  alt={`${userName || "User"} profile`}
                  width="42"
                  height="42"
                  className="size-[42px] rounded-full object-cover"
                />

                <ChevronDownIcon
                  className={[
                    "size-4 transition-transform duration-300",
                    isProfileOpen ? "rotate-180" : "",
                  ].join(" ")}
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border shadow-lg">
                  <div className="border-b p-3">
                    <p className="truncate font-semibold">
                      {userName || "guest"}
                    </p>
                  </div>

                  <nav className="p-2" aria-label="Profile navigation">
                    <a
                      href="/profile"
                      className="block rounded-lg px-3 py-2 transition-opacity duration-300 hover:opacity-70"
                    >
                      Profile
                    </a>

                    <a
                      href="/settings"
                      className="block rounded-lg px-3 py-2 transition-opacity duration-300 hover:opacity-70"
                    >
                      Settings
                    </a>

                    <div className="my-2 border-t" />

                    {/* <button
                      type="button"
                      onClick={onLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-opacity duration-300 hover:opacity-70"
                    >
                      <LogoutIcon className="size-5" />
                      <span>Logout</span>
                    </button> */}
                    <Logout />
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

