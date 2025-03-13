import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Task } from './tasks.schema';

const mockTaskModel: any = jest.fn().mockImplementation((dto) => ({
  ...dto,
  save: jest.fn().mockResolvedValue({ ...dto, _id: '123' }),
}));

mockTaskModel.find = jest.fn().mockReturnThis();
mockTaskModel.exec = jest.fn();
mockTaskModel.findById = jest.fn().mockReturnThis();
mockTaskModel.findByIdAndUpdate = jest.fn().mockReturnThis();
mockTaskModel.findByIdAndDelete = jest.fn().mockReturnThis();

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      const createTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        status: 'à faire',
        userId: 'Sofiane',
      };

      const result = await service.createTask(createTaskDto);
      expect(mockTaskModel).toHaveBeenCalledWith(createTaskDto);
      const instance = mockTaskModel.mock.results[0].value;
      expect(instance.save).toHaveBeenCalled();
      expect(result).toEqual({ ...createTaskDto, _id: '123' });
    });
  });
});
