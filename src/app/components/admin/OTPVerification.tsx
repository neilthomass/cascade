import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { ArrowLeft, Loader2, RefreshCw } from "lucide-react";

interface OTPVerificationProps {
  email: string;
  onVerify: (code: string) => Promise<{ success: boolean; error?: string }>;
  onResend: () => Promise<{ success: boolean; error?: string }>;
  onBack: () => void;
}

export function OTPVerification({ email, onVerify, onResend, onBack }: OTPVerificationProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleVerify = async (value: string) => {
    if (value.length !== 6) return;

    setError(null);
    setLoading(true);

    const result = await onVerify(value);

    if (!result.success) {
      setError(result.error || "Invalid code");
      setCode("");
    }

    setLoading(false);
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setResending(true);
    setError(null);

    const result = await onResend();

    if (result.success) {
      setResendCooldown(60);
    } else {
      setError(result.error || "Failed to resend code");
    }

    setResending(false);
  };

  const handleChange = (value: string) => {
    setCode(value);
    if (value.length === 6) {
      handleVerify(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white border border-gray-200 p-8">
          <button
            onClick={onBack}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </button>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-light text-gray-900 mb-2">Enter Code</h1>
            <p className="text-gray-500 text-sm">
              We sent a 6-digit code to<br />
              <span className="font-medium text-gray-700">{email}</span>
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={handleChange}
              disabled={loading}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="w-11 h-12 text-lg" />
                <InputOTPSlot index={1} className="w-11 h-12 text-lg" />
                <InputOTPSlot index={2} className="w-11 h-12 text-lg" />
                <InputOTPSlot index={3} className="w-11 h-12 text-lg" />
                <InputOTPSlot index={4} className="w-11 h-12 text-lg" />
                <InputOTPSlot index={5} className="w-11 h-12 text-lg" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {loading && (
            <div className="flex justify-center mb-4">
              <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600 text-center mb-4">{error}</p>
          )}

          <div className="text-center">
            <button
              onClick={handleResend}
              disabled={resending || resendCooldown > 0}
              className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
            >
              {resending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-1" />
              )}
              {resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : "Resend code"}
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">
            Code expires in 5 minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
