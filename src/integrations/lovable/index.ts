import { createLovableAuth } from "@lovable.dev/cloud-auth-js";
import { supabase } from "../supabase/client";

const lovableAuth = createLovableAuth();

export const lovable = {
  auth: {
    signInWithOAuth: async (
      provider: "google" | "apple",
      opts?: { redirect_uri?: string; extraParams?: Record<string, string> },
    ) => {
      const result = await lovableAuth.signInWithOAuth(provider, opts);
      if (result.redirected) {
        return result;
      }
      if (result.error) {
        return result;
      }
      try {
        const { data, error } = await supabase.auth.setSession(result.tokens);
        if (error) {
          return { error, redirected: false as const };
        }
        return { data, error: null, redirected: false as const };
      } catch (e) {
        return {
          error: e instanceof Error ? e : new Error(String(e)),
          redirected: false as const,
        };
      }
    },
  },
};
