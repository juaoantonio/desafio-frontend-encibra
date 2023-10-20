import { cookies, headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  // delete all cookies
  const headers = new Headers()
  headers.append('Set-Cookie', `id=;Expires=${new Date(0)} ; Path=/; HttpOnly`)
  headers.append(
    'Set-Cookie',
    `manager=;Expires=${new Date(0)} ; Path=/; HttpOnly`,
  )

  const url = req.nextUrl.clone()
  url.pathname = '/login'
  return NextResponse.redirect(url, {
    status: 301,
    headers,
  })
}
