import requests

print("\n" + "="*60)
print("   REPORTE TÉCNICO")
print("="*60)

def generar_reporte():
    url = "http://localhost:8080/api/tasks"

    try:
        print(f"INFO: Conectando con el servidor en: {url}...")
        response = requests.get(url, timeout=5)

        response.raise_for_status()

        tareas = response.json()

        if not tareas:
            print("\nAVISO: La base de datos está vacía. No hay tareas.")
            return

        print(f"OK: Conexión exitosa. Se han recuperado {len(tareas)} tareas.\n")

        print(f"{'PRIORIDAD':<12} | {'ESTADO':<12} | {'ID':<4} | {'DESCRIPCIÓN'}")
        print("-" * 75)

        for t in tareas:
            prio_text = "[ALTA]" if t.get('priority') == "ALTA" else "[NORMAL]"

            id_t = t.get('id', 'N/A')
            status = t.get('status', '???')
            desc = t.get('description', 'Sin descripción')

            print(f"{prio_text:<12} | {status:<12} | {id_t:<4} | {desc}")

        print("-" * 75)
        print(f"INFO: Fin del reporte técnico.")

    except requests.exceptions.ConnectionError:
        print("\nERROR: No se pudo contactar con el backend (ConnectionError).")
        print("Asegúrese de que el servidor Java en IntelliJ esté activo.")

    except requests.exceptions.Timeout:
        print("\nERROR: El servidor Java ha tardado demasiado en responder.")

    except requests.exceptions.HTTPError:
        print(f"\nERROR: La API devolvió un código de error HTTP {response.status_code}.")

    except Exception as e:
        print(f"\nERROR INESPERADO: {str(e)}")

if __name__ == "__main__":
    generar_reporte()
    print("\n" + "="*60)
    input("Presione Enter para cerrar el sistema...")