import useAuth from "@/utils/useAuth";
import Logo from "@/components/Logo";

function MainComponent() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 font-instrument-serif">
      <div className="w-full max-w-md rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/50 p-8 shadow-2xl text-center">
        <div className="flex justify-center mb-6">
          <Logo size={60} />
        </div>
        <h1 className="text-2xl font-medium text-slate-900 mb-4">Sign out</h1>
        <p className="text-slate-600 text-sm mb-8">
          Are you sure you want to sign out of Dreamcatcher?
        </p>

        <button
          onClick={handleSignOut}
          className="w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white py-4 rounded-2xl font-medium hover:from-slate-700 hover:to-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500/20 transition-all duration-200"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default MainComponent;
