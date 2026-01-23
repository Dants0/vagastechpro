import { NextResponse } from 'next/server';
import { prisma } from '../../../../src/lib/prismaClient';

// GET /api/jobs
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit')) || 10;

  try {
    const jobs = await prisma.job.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      where: {
        postedAt: { not: null } // Só retorna as que já foram postadas (Opcional)
      }
    });

    return NextResponse.json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erro ao buscar vagas' }, { status: 500 });
  }
}