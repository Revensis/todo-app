import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;

  const mockTasksService = {
    createTask: jest.fn((dto) => Promise.resolve({ ...dto, _id: '123' })),
    getAllTasks: jest.fn((filter) =>
      Promise.resolve([
        {
          _id: '123',
          title: 'Test Task',
          description: 'Test Description',
          status: 'à faire',
          userId: 'Sofiane',
        },
      ]),
    ),
    getTaskById: jest.fn((id) =>
      Promise.resolve({
        _id: id,
        title: 'Test Task',
        description: 'Test Description',
        status: 'à faire',
        userId: 'Sofiane',
      }),
    ),
    updateTask: jest.fn((id, dto) => Promise.resolve({ _id: id, ...dto })),
    deleteTask: jest.fn((id) => Promise.resolve({ _id: id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    jest.clearAllMocks(); // Réinitialise les mocks avant chaque test
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call createTask on TasksService when create is called', async () => {
    const dto = {
      title: 'Test Task',
      description: 'Test Description',
      status: 'à faire',
      userId: 'Sofiane',
    };
    const result = await controller.create(dto);
    expect(mockTasksService.createTask).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ ...dto, _id: '123' });
  });

  it('should call getAllTasks on TasksService when findAll is called', async () => {
    const result = await controller.findAll('Sofiane');
    expect(mockTasksService.getAllTasks).toHaveBeenCalledWith({
      userId: 'Sofiane',
    });
    expect(result).toEqual([
      {
        _id: '123',
        title: 'Test Task',
        description: 'Test Description',
        status: 'à faire',
        userId: 'Sofiane',
      },
    ]);
  });

  it('should call getTaskById on TasksService when findOne is called', async () => {
    const id = '123';
    const result = await controller.findOne(id);
    expect(mockTasksService.getTaskById).toHaveBeenCalledWith(id);
    expect(result).toEqual({
      _id: id,
      title: 'Test Task',
      description: 'Test Description',
      status: 'à faire',
      userId: 'Sofiane',
    });
  });

  it('should call updateTask on TasksService when update is called', async () => {
    const id = '123';
    const dto = { title: 'Updated Task' };
    const result = await controller.update(id, dto);
    expect(mockTasksService.updateTask).toHaveBeenCalledWith(id, dto);
    expect(result).toEqual({ _id: id, ...dto });
  });

  it('should call deleteTask on TasksService when remove is called', async () => {
    const id = '123';
    const result = await controller.remove(id);
    expect(mockTasksService.deleteTask).toHaveBeenCalledWith(id);
    expect(result).toEqual({ _id: id });
  });
});
