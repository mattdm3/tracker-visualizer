export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      activities: {
        Row: {
          colour: string | null
          created_at: string | null
          email: string | null
          emoji: string | null
          id: number
          name: string | null
        }
        Insert: {
          colour?: string | null
          created_at?: string | null
          email?: string | null
          emoji?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          colour?: string | null
          created_at?: string | null
          email?: string | null
          emoji?: string | null
          id?: number
          name?: string | null
        }
      }
      items: {
        Row: {
          created_at: string
          description: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          name?: string
        }
      }
      logs: {
        Row: {
          activity: string
          created_at: string | null
          duration: string
          email: string | null
          end_time: string
          id: number
          start_time: string
        }
        Insert: {
          activity: string
          created_at?: string | null
          duration: string
          email?: string | null
          end_time: string
          id?: number
          start_time: string
        }
        Update: {
          activity?: string
          created_at?: string | null
          duration?: string
          email?: string | null
          end_time?: string
          id?: number
          start_time?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
