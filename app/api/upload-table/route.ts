import { NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";

const bucketName = "rzkdigital-bucket-private";

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS!);

const storage = new Storage({
  credentials,
});

export async function POST(request: Request) {
  try {
    const { filename, data, customMetadata } = await request.json();

    if (!filename || !data) {
      return NextResponse.json(
        { error: 'Parâmetros "filename" e "data" são obrigatórios.' },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(data, "base64");
    const file = storage.bucket(bucketName).file(filename);

    // Opções para o upload, incluindo metadados customizados (se enviados)
    const options: {
      resumable: boolean;
      contentType: string;
      metadata?: {
        metadata: any;
      };
    } = {
      resumable: false,
      contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    };

    if (customMetadata) {
      options.metadata = {
        metadata: customMetadata,
      };
    }

    await file.save(fileBuffer, options);

    return NextResponse.json(
      { message: "Upload realizado com sucesso!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Erro no upload para o bucket",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
