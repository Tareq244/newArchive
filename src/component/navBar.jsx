import { useState } from "react";

import { createFolder } from "../services/folderService";
import { uploadFile } from "../services/fileService";

import DarkLightMode from "../helper/toggle/DarkLightMode";

import { MenuIcon, CloseIcon, FolderPlusIcon, UploadIcon, SearchIcon, MoonIcon, ChevronDownIcon, LogoutIcon } from '../icons/Icons';
import Logout from "../services/logout/Logout";

import Swal from "sweetalert2";
import Loading from "./Loading";

export default function Navbar({ userName, onSearch }) {

  const logo = "/assets/images/logo1.png";
  const avatar = "/assets/images/avatar.jpg";
  const createfolder = "/assets/gif/folder.gif";
  const uploadfile = "/assets/gif/file.gif";

  const errimg = "/assets/gif/error.gif";
  const success = "/assets/gif/success.gif";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentParentId, setCurrentParentId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch?.(searchTerm.trim());
  };

  const handleCreateFolder = async () => {
    setLoading(true);

    const result = await Swal.fire({
      imageUrl: createfolder,
      imageWidth: 150,
      imageHeight: 150,
      title: "Create Folder",
      html: `
      <input
        id="folder-name"
        class="swal2-input"
        placeholder="Enter folder name..."
      />
      <textarea
        id="folder-description"
        class="swal2-textarea"
        placeholder="Enter folder description..."
        rows="2"
      ></textarea>
    `,
      showCancelButton: true,
      confirmButtonText: "Create",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        popup: "login-swal-popup",
      },
      preConfirm: () => {
        const name = document
          .getElementById("folder-name")
          .value.trim();

        const description = document
          .getElementById("folder-description")
          .value.trim();

        if (!name) {
          Swal.showValidationMessage("Please enter a folder name.");
          return false;
        }

        return {
          name,
          description,
        };
      },
    });
    if (!result.isConfirmed) {
      setLoading(false);
      return;
    }
    const { name, description } = result.value;
    try {
      const createdFolder = await createFolder({
        name: name,
        description: description || null,
        parentId: currentParentId,
      });
      console.log("Created:", createdFolder);
      await Swal.fire({
        imageUrl: success,
        imageWidth: 150,
        imageHeight: 150,
        title: "Folder Created",
        text: `"${name}" created successfully.`,
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          popup: "login-swal-popup",
        },
      });
    } catch (error) {
      console.error("Create folder error:", error);
      Swal.fire({
        imageUrl: errimg,
        imageWidth: 150,
        imageHeight: 150,
        title: "Failed",
        text: error.message || "Unable to create folder.",
        customClass: {
          popup: "login-swal-popup",
        },
      });
    } finally { setLoading(false) }

  };

  const handleUploadFile = async () => {
    setLoading(true);

    const result = await Swal.fire({
      imageUrl: uploadfile,
      imageWidth: 150,
      imageHeight: 150,
      title: "Upload File",
      html: `
            <input
                type="file"
                id="file-input"
                class="swal2-file"
            />
            <textarea
                id="file-description"
                class="swal2-textarea"
                placeholder="Enter file description..."
                rows="2"
            ></textarea>
        `,
      showCancelButton: true,
      confirmButtonText: "Upload",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        popup: "login-swal-popup",
      },
      preConfirm: () => {
        const fileInput = document.getElementById("file-input");

        const description = document
          .getElementById("file-description")
          .value.trim();

        const file = fileInput.files[0];

        if (!file) {
          Swal.showValidationMessage(
            "Please select a file."
          );

          return false;
        }

        return {
          file,
          description,
        };
      },
    });

    if (!result.isConfirmed) {
      setLoading(false);
      return;
    }

    const { file, description } = result.value;

    try {
      const uploadedFile = await uploadFile(
        file,
        currentParentId,
        description || null
      );

      console.log("Uploaded:", uploadedFile);

      await Swal.fire({
        imageUrl: success,
        imageWidth: 150,
        imageHeight: 150,

        title: "File Uploaded",

        text: `"${file.name}" uploaded successfully.`,

        timer: 1500,
        showConfirmButton: false,

        customClass: {
          popup: "login-swal-popup",
        },
      });

      // هون ممكن تعمل refresh للملفات
      // await loadFiles();

    } catch (error) {
      console.error("Upload file error:", error);

      await Swal.fire({
        imageUrl: errimg,
        imageWidth: 150,
        imageHeight: 150,

        title: "Failed",

        text: error.message || "Unable to upload file.",

        customClass: {
          popup: "login-swal-popup",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // const handleFileChange = async (e) => {
  //   const file = e.target.files[0];

  //   if (!file) return;

  //   try {
  //     const result = await uploadFile(file, parentId);

  //     console.log("File uploaded:", result);

  //   } catch (error) {
  //     console.error("Upload error:", error.message);
  //   }
  // };

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
              onClick={handleUploadFile}
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
                    <Logout />
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </nav>
  );
}

