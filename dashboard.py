import streamlit as st
import requests
import pandas as pd
import plotly.express as px

PUERTO_BACKEND = 8080
URL_API = f"http://localhost:{PUERTO_BACKEND}/api/tasks"

st.set_page_config(page_title="Task Manager Dashboard", layout="wide")

st.title("Panel de Control de Tareas")
st.markdown("Visualización en tiempo real del **Backend Spring Boot**")

def cargar_datos():
    try:
        response = requests.get(URL_API, timeout=3)
        if response.status_code == 200:
            return response.json()
    except Exception:
        return None
    return None

data = cargar_datos()

if data:
    df = pd.DataFrame(data)

    mapeo_orden = {
        'ALTA': '1. ALTA',
        'MEDIA': '2. MEDIA',
        'BAJA': '3. BAJA'
    }
    df['priority'] = df['priority'].map(mapeo_orden)

    df = df.sort_values('priority')

    col1, col2, col3 = st.columns(3)
    col1.metric("Total Tareas", len(df))
    col2.metric("Prioridad ALTA", len(df[df['priority'] == '1. ALTA']))
    col3.metric("Pendientes", len(df[df['status'] == 'PENDIENTE']))

    st.divider()

    col_left, col_right = st.columns(2)

    with col_left:
        st.subheader("Distribución por prioridad")
        fig_pie = px.pie(df, names='priority', color='priority',
                         color_discrete_map={'1. ALTA':'#ef553b', '2. MEDIA':'#636efa', '3. BAJA':'#00cc96'})
        st.plotly_chart(fig_pie, use_container_width=True)

    with col_right:
        st.subheader("Listado de tareas")
        st.dataframe(df[['id', 'description', 'priority', 'status']], use_container_width=True, hide_index=True)

    if st.button('Actualizar Datos'):
        st.rerun()

else:
    st.error(f"Error de conexión: No se puede acceder a la API en el puerto {PUERTO_BACKEND}.")
    st.info(f"Para solucionar esto, asegúrate de que el servidor esté en ejecución.")