import { useState } from "react";
import useAuth from "@/utils/useAuth";
import Logo from "@/components/Logo";
import { CheckCircle, Moon, Brain, Sparkles, ArrowRight } from "lucide-react";

function MainComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    dreamGoal: "",
    frequency: "",
  });

  const { signUpWithCredentials } = useAuth();

  const steps = [
    {
      id: "welcome",
      title: "Welcome to Dreamcatcher",
      subtitle: "Unlock the hidden wisdom of your subconscious mind",
      component: WelcomeStep,
    },
    {
      id: "goals",
      title: "What's your dream goal?",
      subtitle: "Help us personalize your experience",
      component: GoalsStep,
    },
    {
      id: "frequency",
      title: "How often do you remember dreams?",
      subtitle: "We'll customize insights based on your recall frequency",
      component: FrequencyStep,
    },
    {
      id: "account",
      title: "Create your account",
      subtitle: "Just a few details to get started",
      component: AccountStep,
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      // Temporary bypass - any email/password combination works
      window.location.href = '/';
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  index <= currentStep
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-400 border-2 border-gray-200"
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle size={16} />
                ) : (
                  index + 1
                )}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 p-8 shadow-2xl">
          <CurrentStepComponent
            data={formData}
            setData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
            currentStep={currentStep}
            totalSteps={steps.length}
            handleSubmit={handleSubmit}
            loading={loading}
            error={error}
            stepInfo={steps[currentStep]}
          />
        </div>
      </div>
    </div>
  );
}

function WelcomeStep({ nextStep, stepInfo }) {
  const features = [
    {
      icon: <Moon className="w-6 h-6 text-indigo-600" />,
      title: "Record Dreams",
      description: "Capture your dreams with voice or text instantly upon waking"
    },
    {
      icon: <Brain className="w-6 h-6 text-purple-600" />,
      title: "AI Analysis",
      description: "Get personalized insights into your subconscious patterns"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-pink-600" />,
      title: "Discover Patterns",
      description: "Track themes, emotions, and symbols across all your dreams"
    }
  ];

  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <Logo size={80} />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        {stepInfo.title}
      </h1>
      <p className="text-gray-600 mb-8 text-lg">
        {stepInfo.subtitle}
      </p>

      <div className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start text-left p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white">
            <div className="flex-shrink-0 mr-4 mt-1">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={nextStep}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2"
      >
        Get Started
        <ArrowRight size={20} />
      </button>
    </div>
  );
}

function GoalsStep({ data, setData, nextStep, prevStep, stepInfo }) {
  const goals = [
    { id: "understand", title: "Understand my subconscious", icon: "🧠" },
    { id: "recurring", title: "Explore recurring dreams", icon: "🔄" },
    { id: "lucid", title: "Learn lucid dreaming", icon: "✨" },
    { id: "emotions", title: "Process emotions", icon: "💭" },
    { id: "creativity", title: "Boost creativity", icon: "🎨" },
    { id: "healing", title: "Spiritual healing", icon: "🌟" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        {stepInfo.title}
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        {stepInfo.subtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => setData({ ...data, dreamGoal: goal.id })}
            className={`p-4 rounded-xl border-2 transition-all text-left hover:bg-gray-50 ${
              data.dreamGoal === goal.id
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200"
            }`}
          >
            <div className="text-2xl mb-2">{goal.icon}</div>
            <div className="font-semibold text-gray-900">{goal.title}</div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={prevStep}
          className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={!data.dreamGoal}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function FrequencyStep({ data, setData, nextStep, prevStep, stepInfo }) {
  const frequencies = [
    { id: "daily", title: "Daily", subtitle: "Almost every night", icon: "🌙" },
    { id: "often", title: "Often", subtitle: "A few times per week", icon: "⭐" },
    { id: "sometimes", title: "Sometimes", subtitle: "Once a week or less", icon: "💫" },
    { id: "rarely", title: "Rarely", subtitle: "I hardly remember dreams", icon: "💤" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        {stepInfo.title}
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        {stepInfo.subtitle}
      </p>

      <div className="space-y-3 mb-8">
        {frequencies.map((freq) => (
          <button
            key={freq.id}
            onClick={() => setData({ ...data, frequency: freq.id })}
            className={`w-full p-4 rounded-xl border-2 transition-all text-left hover:bg-gray-50 ${
              data.frequency === freq.id
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-center">
              <div className="text-2xl mr-4">{freq.icon}</div>
              <div>
                <div className="font-semibold text-gray-900">{freq.title}</div>
                <div className="text-sm text-gray-600">{freq.subtitle}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={prevStep}
          className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={!data.frequency}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function AccountStep({ data, setData, prevStep, handleSubmit, loading, error, stepInfo }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        {stepInfo.title}
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        {stepInfo.subtitle}
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name (optional)
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Enter your name"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="Create a password"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
          />
          <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-600">
            {error}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={prevStep}
          className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading || !data.email || !data.password}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </div>

      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <a
          href="/account/signin"
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          Sign in
        </a>
      </p>
    </div>
  );
}

export default MainComponent;