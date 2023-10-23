'use client'

import { Form } from '@/components/Form'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schemas'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const {
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitSuccessful },
    setError,
  } = methods

  async function loginCollaborator(data: LoginFormValues) {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.redirected) {
      router.refresh()
      router.push(response.url)
      return
    }

    const result = await response.json()

    if (result.message) {
      setError('root', {
        type: 'manual',
        message: result.message,
      })
    }
  }

  return (
    <FormProvider {...methods}>
      <Form.Wrapper>
        <Form.Title>Login</Form.Title>
        <Form.Root onSubmit={handleSubmit(loginCollaborator)}>
          <Form.Inputs>
            <Form.Input type="email" name="email" error={errors.email?.message}>
              Email
            </Form.Input>
            <Form.Input
              type="password"
              name="password"
              error={errors.password?.message}
            >
              Senha
            </Form.Input>
          </Form.Inputs>
          <hr />
          {errors.root?.message && (
            <p className="text-red-500 text-sm font-medium">
              {errors.root?.message}
            </p>
          )}

          {isSubmitted || isSubmitSuccessful ? (
            <Form.Button disabled>Carregando...</Form.Button>
          ) : (
            <Form.Button>Entrar</Form.Button>
          )}
        </Form.Root>
      </Form.Wrapper>
    </FormProvider>
  )
}
