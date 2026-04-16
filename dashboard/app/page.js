'use client';
import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Filter, 
  Calendar,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' }));
    fetch('/api/stats')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="dashboard-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Cargando Dashboard de Jony Franco...</div>
    </div>
  );

  const { stats, regions, evolution, recent } = data;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.2rem' }}>
            Sales Dashboard by Jony Franco
          </h1>
          <p style={{ color: '#888' }}>Visualización de Datos ETL — {currentDate}</p>
        </div>
        <div className="glass-card" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="status-badge">● Sistema ETL Activo</div>
        </div>
      </header>

      {/* KPI Stats */}
      <div className="grid-stats">
        <div className="glass-card stat-card purple-glow">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(157, 78, 221, 0.2)', padding: '10px', borderRadius: '12px' }}>
              <DollarSign size={24} color="#9d4edd" />
            </div>
            <ArrowUpRight size={20} color="#555" />
          </div>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>Ventas Totales</p>
          <h2 style={{ fontSize: '1.8rem', margin: '0.5rem 0' }}>
            S/. {Number(stats?.total_revenue || 0).toLocaleString('es-PE')}
          </h2>
          <div style={{ fontSize: '0.75rem', color: '#4cc9f0' }}>+12.5% vs ayer</div>
        </div>

        <div className="glass-card stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(76, 201, 240, 0.2)', padding: '10px', borderRadius: '12px' }}>
              <ShoppingCart size={24} color="#4cc9f0" />
            </div>
          </div>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>Transacciones</p>
          <h2 style={{ fontSize: '1.8rem', margin: '0.5rem 0' }}>{stats?.total_count}</h2>
          <div style={{ fontSize: '0.75rem', color: '#4cc9f0' }}>Pipeline n8n ejecutado</div>
        </div>

        <div className="glass-card stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(247, 37, 133, 0.2)', padding: '10px', borderRadius: '12px' }}>
              <Package size={24} color="#f72585" />
            </div>
          </div>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>Producto Estrella</p>
          <h2 style={{ fontSize: '1.4rem', margin: '0.5rem 0' }}>{stats?.best_product}</h2>
          <div style={{ fontSize: '0.75rem', color: '#888' }}>Por recaudación total</div>
        </div>

        <div className="glass-card stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(157, 78, 221, 0.2)', padding: '10px', borderRadius: '12px' }}>
              <Activity size={24} color="#9d4edd" />
            </div>
          </div>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>Ticket Promedio</p>
          <h2 style={{ fontSize: '1.8rem', margin: '0.5rem 0' }}>
            S/. {Number(stats?.avg_ticket || 0).toFixed(2)}
          </h2>
          <div style={{ fontSize: '0.75rem', color: '#888' }}>Datos procesados en SQLite</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid-charts">
        <div className="glass-card chart-container">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={20} color="#9d4edd" /> Evolución de Ventas
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={evolution}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9d4edd" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#9d4edd" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
              <XAxis dataKey="name" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '8px' }}
                itemStyle={{ color: '#9d4edd' }}
              />
              <Area type="monotone" dataKey="value" stroke="#9d4edd" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card chart-container">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={20} color="#4cc9f0" /> Ventas por Región
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={regions}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
              <XAxis dataKey="region" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '8px' }}
              />
              <Bar dataKey="value" fill="#4cc9f0" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table Section */}
      <div className="glass-card table-container">
        <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Calendar size={20} color="#f72585" /> Últimas Transacciones (ETL Cleaned)
        </h3>
        <table>
          <thead>
            <tr>
              <th>ID Transacción</th>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Región</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((row) => (
              <tr key={row.transaction_id}>
                <td style={{ fontWeight: 'bold', color: '#888' }}>#{row.transaction_id}</td>
                <td>{new Date(row.date).toLocaleDateString()}</td>
                <td>{row.product}</td>
                <td>S/. {Number(row.price).toFixed(2)}</td>
                <td>{row.quantity}</td>
                <td>{row.region}</td>
                <td style={{ color: '#9d4edd', fontWeight: 'bold' }}>S/. {Number(row.total_amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer style={{ marginTop: '3rem', textAlign: 'center', color: '#555', fontSize: '0.8rem' }}>
        Dashboard para Portafolio Profesional — Sales ETL Pipeline & Next.js Analytics
      </footer>
    </div>
  );
}
