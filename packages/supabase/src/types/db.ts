export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	// biome-ignore lint/style/useNamingConvention: key name is fixed by Supabase codegen
	__InternalSupabase: {
		PostgrestVersion: "12.2.3 (519615d)";
	};
	public: {
		Tables: {
			ama_questions: {
				Row: {
					id: string;
					slug: string | null;
					question: string;
					asker_name: string | null;
					asker_email: string | null;
					status: Database["public"]["Enums"]["ama_status"];
					answer: string | null;
					pinned: boolean;
					created_at: string;
					answered_at: string | null;
				};
				Insert: {
					id?: string;
					slug?: string | null;
					question: string;
					asker_name?: string | null;
					asker_email?: string | null;
					status?: Database["public"]["Enums"]["ama_status"];
					answer?: string | null;
					pinned?: boolean;
					created_at?: string;
					answered_at?: string | null;
				};
				Update: {
					id?: string;
					slug?: string | null;
					question?: string;
					asker_name?: string | null;
					asker_email?: string | null;
					status?: Database["public"]["Enums"]["ama_status"];
					answer?: string | null;
					pinned?: boolean;
					created_at?: string;
					answered_at?: string | null;
				};
				Relationships: [];
			};
			ama_messages: {
				Row: {
					id: string;
					question_id: string;
					role: Database["public"]["Enums"]["ama_message_role"];
					body: string;
					created_at: string;
				};
				Insert: {
					id?: string;
					question_id: string;
					role: Database["public"]["Enums"]["ama_message_role"];
					body: string;
					created_at?: string;
				};
				Update: {
					id?: string;
					question_id?: string;
					role?: Database["public"]["Enums"]["ama_message_role"];
					body?: string;
					created_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "ama_messages_question_id_fkey";
						columns: ["question_id"];
						isOneToOne: false;
						referencedRelation: "ama_questions";
						referencedColumns: ["id"];
					},
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			ama_status: "pending" | "answered" | "published" | "rejected";
			ama_message_role: "asker" | "owner";
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};
