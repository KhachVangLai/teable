import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { PrismaService } from '@teable-group/db-main-prisma';
import { ClsService } from 'nestjs-cls';
import { FieldDeletingService } from './field-deleting.service';
import { FieldOpenApiModule } from './field-open-api.module';

describe('FieldDeletingService', () => {
  let service: FieldDeletingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FieldOpenApiModule],
    })
      .useMocker((token) => {
        if (token === ClsService || token === PrismaService) {
          return jest.fn();
        }
      })
      .compile();

    service = module.get<FieldDeletingService>(FieldDeletingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});