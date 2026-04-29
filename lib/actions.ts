"use server";

import { redirect, RedirectType } from "next/navigation";

export async function analyzeGames(formData: FormData) {
  const username = formData.get("username");

  redirect(`./${username}/accuracy`, RedirectType.push);
}
