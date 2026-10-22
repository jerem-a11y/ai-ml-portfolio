
import { NextResponse } from "next/server";

interface GithubRepository {
  name: string;
  description: string | null;
  language: string | null;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
}

export const revalidate = 3600;

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    const token = process.env.GITHUB_TOKEN;

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
      "https://api.github.com/users/jerem-a11y/repos?per_page=100&sort=updated&type=owner",
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      const message =
        response.status === 403
          ? "GitHub rate limit reached"
          : "GitHub API unavailable";

      return NextResponse.json(
        { repositories: [], error: message },
        { status: 502 }
      );
    }

    const data: unknown = await response.json();

    let repositories: GithubRepository[] = [];

    if (Array.isArray(data)) {
      repositories = (data as GithubRepository[])
        .filter((repo) => !repo.fork && !repo.archived)
        .map((repo) => ({
          name: repo.name,
          description: repo.description,
          language: repo.language,
          fork: repo.fork,
          archived: repo.archived,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          html_url: repo.html_url,
          updated_at: repo.updated_at,
        }));
    }

    return NextResponse.json(
      { repositories },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch {
    return NextResponse.json(
      {
        repositories: [],
        error: "GitHub API unavailable",
      },
      { status: 502 }
    );
  }
}
