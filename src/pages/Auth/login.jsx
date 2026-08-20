import { useState } from "react";
import { EyeIcon, EyeOffIcon, EmailIcon } from '../../icons/Icons';
import { useNavigate } from "react-router-dom";
import { environment } from "../../enviroments";
import { saveUser } from "../../services/authService";
import Loading from "../../component/Loading";

function Login() {

    const bg = "/assets/images/bg.jpg";
    const apiUrl = environment.apiUrl;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: true,
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setIsSubmitting(true);

        try {
            setLoading(true);
            const response = await fetch(
                `${environment.apiUrl}auth/signin`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        emailOrPhone: formData.email,
                        password: formData.password,
                    }),
                }
            );

            const data = await response.json();

            console.log("Status:", response.status);
            console.log("Response:", data);

            if (!response.ok) {
                throw new Error(
                    typeof data === "string"
                        ? data
                        : data.message || "Invalid email or password."
                );
            }

            console.log("Login successful:", data);
            saveUser(data);
            navigate("/HomePage");

        } catch (error) {
            console.log("Login failed:", error);

            setError(
                error.message || "Unable to sign in. Please check your details."
            );

        } finally {
            setIsSubmitting(false);
            setLoading(false);
        }
    };

    

    return (
        <main
            className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12"
            style={{
                backgroundImage: `url(${bg})`,
                objectFit: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }} >
            <section className="loginPage relative z-10 w-full max-w-md">
                <h1 className="mb-8 text-center text-3xl font-light">
                    Have an account?
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="sr-only">
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            autoComplete="email"
                            required
                            className="h-[50px] w-full rounded-full border px-5 outline-none transition-all duration-300"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            autoComplete="current-password"
                            required
                            className="h-[50px] w-full rounded-full border py-3 pl-5 pr-14 outline-none transition-all duration-300"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((currentValue) => !currentValue)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-110 text-black"
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                        >
                            {showPassword ? (
                                <EyeOffIcon className="size-5" />
                            ) : (
                                <EyeIcon className="size-5" />
                            )}
                        </button>
                    </div>

                    {error && (
                        <div
                            role="alert"
                            className="rounded-xl border px-4 py-3 text-sm"
                        >
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-[50px] w-full rounded-full border px-5 text-sm font-semibold uppercase transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Signing in..." : "Sign In"}
                    </button>

                    <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                        <label className="flex cursor-pointer items-center gap-3 font-medium">
                            <input
                                name="rememberMe"
                                type="checkbox"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="size-5 cursor-pointer rounded"
                            />

                            <span>Remember Me</span>
                        </label>

                        <a
                            href="/forgot-password"
                            className="transition-opacity duration-300 hover:opacity-70"
                        >
                            Forgot Password
                        </a>
                    </div>
                </form>

                <p className="my-7 text-center text-sm">
                    — If you have any problem, contact us —
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <a
                        href="mailto:support@example.com"
                        className="flex items-center justify-center gap-2 rounded-lg border px-4 py-3 transition-transform duration-300 hover:-translate-y-1"
                    >
                        <EmailIcon className="size-5" />
                        Email
                    </a>

                    <a
                        href="mailto:info@example.com"
                        className="flex items-center justify-center gap-2 rounded-lg border px-4 py-3 transition-transform duration-300 hover:-translate-y-1"
                    >
                        <EmailIcon className="size-5" />
                        Email
                    </a>
                </div>
            </section>

            {loading && <Loading />}
        </main>
    );
}

export default Login;

