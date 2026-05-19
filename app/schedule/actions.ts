'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function deleteAppointment(formData: FormData) {
  const id = formData.get('id') as string
  await supabase.from('appointments').delete().eq('id', id)
  revalidatePath('/schedule')
}
