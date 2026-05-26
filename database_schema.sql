-- Supabase Auth handles email/password in auth.users
-- Tambahan di public schema:

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    date_of_birth DATE,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mengaktifkan RLS untuk tabel profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE TABLE intake_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'in_progress' 
        CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    chief_complaint TEXT, -- keluhan utama (diisi setelah pertanyaan pertama)
    questions_answered INT DEFAULT 0,
    total_questions_planned INT DEFAULT 8,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mengaktifkan RLS untuk intake_sessions
ALTER TABLE intake_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own sessions." ON intake_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sessions." ON intake_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sessions." ON intake_sessions FOR UPDATE USING (auth.uid() = user_id);


CREATE TABLE intake_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES intake_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('assistant', 'user')),
    content TEXT NOT NULL,
    question_category TEXT, -- 'chief_complaint', 'onset', 'severity', 'location', 'aggravating', 'relieving', 'associated', 'history'
    message_order INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mengaktifkan RLS untuk intake_messages
ALTER TABLE intake_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view messages of own session." ON intake_messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM intake_sessions WHERE intake_sessions.id = intake_messages.session_id AND intake_sessions.user_id = auth.uid())
);
CREATE POLICY "Users can insert messages to own session." ON intake_messages FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM intake_sessions WHERE intake_sessions.id = intake_messages.session_id AND intake_sessions.user_id = auth.uid())
);


CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES intake_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    
    -- Structured content
    content_json JSONB NOT NULL, -- full structured report data
    summary_text TEXT, -- plain text summary
    
    -- Sharing
    share_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
    is_shared BOOLEAN DEFAULT FALSE,
    shared_at TIMESTAMPTZ,
    
    -- Metadata
    generated_at TIMESTAMPTZ DEFAULT NOW(),
    pdf_url TEXT, -- optional, jika generate PDF
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mengaktifkan RLS untuk reports
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own reports." ON reports FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own reports." ON reports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reports." ON reports FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view shared reports by token." ON reports FOR SELECT USING (is_shared = true);


CREATE TABLE report_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    helpful BOOLEAN,
    feedback_text TEXT,
    feedback_by TEXT CHECK (feedback_by IN ('patient', 'doctor')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger untuk update updated_at di profiles
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
