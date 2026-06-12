"""
supabase_cli.py — Utilitário para executar SQL no banco da Feira Pedagógica
Uso: python supabase_cli.py "SELECT * FROM edicoes;"

CONFIGURAÇÃO: Defina as variáveis de ambiente antes de usar:
  set SUPABASE_TOKEN=seu_token_aqui
  set SUPABASE_PROJECT=seu_project_id_aqui
"""
import requests, json, sys, os

TOKEN   = os.environ.get("SUPABASE_TOKEN", "")
PROJECT = os.environ.get("SUPABASE_PROJECT", "")
URL     = f"https://api.supabase.com/v1/projects/{PROJECT}/database/query"
HEADERS = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}

def run(query):
    if not TOKEN or not PROJECT:
        print("❌ Configure SUPABASE_TOKEN e SUPABASE_PROJECT como variáveis de ambiente")
        return
    r = requests.post(URL, headers=HEADERS, json={"query": query})
    data = r.json()
    if isinstance(data, list):
        if data:
            cols = list(data[0].keys())
            print(" | ".join(cols))
            print("-" * 60)
            for row in data:
                print(" | ".join(str(row.get(c,"")) for c in cols))
        print(f"\n({len(data)} registros)")
    else:
        print(json.dumps(data, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    query = " ".join(sys.argv[1:]) if len(sys.argv) > 1 else "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name;"
    run(query)
