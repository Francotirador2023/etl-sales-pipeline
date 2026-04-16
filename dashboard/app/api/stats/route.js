import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. KPI Stats
    const stats = await query(`
      SELECT 
        COUNT(*) as total_count,
        SUM(total_amount) as total_revenue,
        AVG(total_amount) as avg_ticket,
        (SELECT product FROM sales_clean GROUP BY product ORDER BY SUM(total_amount) DESC LIMIT 1) as best_product
      FROM sales_clean
    `);

    // 2. Region Chart
    const regions = await query(`
      SELECT region, SUM(total_amount) as value
      FROM sales_clean
      GROUP BY region
      ORDER BY value DESC
    `);

    // 3. Time Chart (Daily)
    const evolution = await query(`
      SELECT strftime('%Y-%m-%d', date) as name, SUM(total_amount) as value
      FROM sales_clean
      GROUP BY name
      ORDER BY name ASC
      LIMIT 15
    `);

    // 4. Recent Sales
    const recent = await query(`
      SELECT * FROM sales_clean
      ORDER BY date DESC
      LIMIT 8
    `);

    return NextResponse.json({
      stats: stats[0],
      regions,
      evolution,
      recent
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
